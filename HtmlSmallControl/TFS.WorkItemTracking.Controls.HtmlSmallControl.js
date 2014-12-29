/* 

HtmlSmallControl custom control 

*/

TFS.module("TFS.WorkItemTracking.Controls.HtmlSmallControl", ["TFS.WorkItemTracking.Controls", "TFS.WorkItemTracking", "TFS.Core"], function () {
    var WITOM = TFS.WorkItemTracking,
        WITCONTROLS = TFS.WorkItemTracking.Controls,
        delegate = TFS.Core.delegate;

    function HtmlSmallControl(container, options, workItemType) {
        this.baseConstructor.call(this, container, options, workItemType);
    }

    HtmlSmallControl.inherit(WITCONTROLS.WorkItemControl, {
        _control: null,

        _init: function () {
            var that = this;
            this._base();
            var hostConfig = TFS.Host.TfsContext.getDefault().configuration;

            // default height specification
            var customHeight = "150px";
            if (this._options.height)
                customHeight = this._options.height;

            this._control = TFS.UI.Controls.BaseControl.createIn(TFS.UI.Controls.Common.RichEditor, this._container, {
                fireOnEveryChange: true,
                blankPageUrl: hostConfig.getThemedFile("Blank.htm"),
                height: customHeight,
                id: this._options.controlId,
                change: delegate(this, function () {
                    that.flush();
                    return false;
                })
            });
        },

        invalidate: function (flushing) {
            var control = this._control, 
                field = this._getField(),readOnly;

            if (field) {
                if (!flushing) {

                    readOnly = this.isReadOnly();  
                    this._control.ready(function () {
                        control.setValue(field.getValue());                                                             
                        control.setEnabled(!readOnly);       
                    });
                }
            }
            else {
                control.setEnabled(false);
            }
        },
        _getControlValue: function () {
            return this._control.getValue();
        },
        clear: function () {
            this._control.setValue("");
        }
    });

    // Register this module as a work item custom control called "HtmlSmallControl"
    WITCONTROLS.registerWorkItemControl("HtmlSmallControl", HtmlSmallControl);

    return {
        HtmlSmallControl: HtmlSmallControl
    };
});
