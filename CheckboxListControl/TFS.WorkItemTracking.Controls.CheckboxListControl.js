/* 
    CheckboxListControl
*/


TFS.module("TFS.WorkItemTracking.Controls.CheckboxListControl", ["TFS.WorkItemTracking.Controls",  "TFS.Core", "TFS.UI.Controls.Common"], function () {
    var WITCONTROLS = TFS.WorkItemTracking.Controls,
        delegate = TFS.Core.delegate;

    function CheckboxListControl(container, options, workItemType) {
        this.baseConstructor.call(this, container, options, workItemType);
    }

    CheckboxListControl.inherit(WITCONTROLS.WorkItemControl, {
        _control: null,

        _init: function () {
            var that = this;

            this._base();

            this._control = TFS.UI.Controls.BaseControl.createIn(TFS.UI.Controls.Common.CheckboxList, this._container, {
                joinChar: this._options.valueSeparator || ',',
                sepChar: this._options.valueSeparator || ',',
                change: delegate(this, function () {
                    that.flush();
                    var val = this.getCheckedValues().join(",");
                    this._getField().setValue(val);
                    return false;
                })
            });
        },
       
        invalidate: function (flushing) {
            var field = this._getField();
            if (field && this._control) {
                if (!flushing) {
                    this._control.setItems(field.getAllowedValues());
                    var data = field.getValue().split(",");
                    this._control.setCheckedValues(data);
                }
            }
        },
        _getControlValue: function () {
            return this._control.getCheckedValues().join(",");
        }
    });

    // Register this module as a work item custom control called "CheckboxListControl"
    WITCONTROLS.registerWorkItemControl("CheckboxListControl", CheckboxListControl);

    return {
        CheckboxListControl: CheckboxListControl
    };
});
