/* 
    TextAreaControl
*/


TFS.module("TFS.WorkItemTracking.Controls.TextAreaControl", ["TFS.WorkItemTracking.Controls", "TFS.Core", "TFS.UI.Controls.Common"], function ()
    {
    var WITCONTROLS = TFS.WorkItemTracking.Controls,
        delegate = TFS.Core.delegate;

    function TextAreaControl(container, options, workItemType) {
        this.baseConstructor.call(this, container, options, workItemType);
    }

    TextAreaControl.inherit(WITCONTROLS.WorkItemControl, {
        _control: null,

        _init: function () {
            var that = this;

            this._base();
            this._control = $("<TextArea></TextArea>").appendTo(this._container);
        },
        
        bind: function (workitem) {
            this.base.bind(workitem);
            
            var currentText = this._getField().getValue();
            if (this._control && this._control[0]) {
                this._control[0].value = currentText;
            }
            
            this._control.bind("change", delegate(this, this._onChange));
        },

        unbind: function (workitem) {
            this._control.unbind("change", delegate(this, this._onChange));
            this.base.unbind(workitem);
        },

        invalidate: function (flushing) {
            var field = this._getField();
            if (field && this._control && this._control[0]) {
                if (!flushing) {
                    this._control[0].value = field.getValue();
                }
            }
        },
        clear: function () {
            this._control.empty();
        },
        
        _onChange: function () {
            if (this._control && this._control[0]) {
                var val = this._control[0].value;
                this._getField().setValue(val);
            }
        }
    });

    // Register this module as a work item custom control called "TextAreaControl"
    WITCONTROLS.registerWorkItemControl("TextAreaControl", TextAreaControl);

    return {
        TextAreaControl: TextAreaControl
    };
});
