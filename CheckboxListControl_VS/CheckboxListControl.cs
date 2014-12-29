using System;
using System.Drawing;
using System.Windows.Forms;
using Microsoft.TeamFoundation.WorkItemTracking.Controls;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using System.Globalization;
using System.Collections.Specialized;
using System.ComponentModel;


namespace TFSCommunity.CustomControls
{
    public partial class CheckboxListControl : UserControl, IWorkItemControl, IWorkItemToolTip
    {
        private CheckedListBox _checkedListBox=new CheckedListBox();
        private const int MaximunItems = 6;

        public CheckboxListControl()
        {
            InitializeComponent();
            _checkedListBox.Dock = DockStyle.Top;
            _checkedListBox.CheckOnClick = true;
            _checkedListBox.BorderStyle = BorderStyle.None;
            _checkedListBox.Sorted = true;
            _checkedListBox.IntegralHeight = true;
            _checkedListBox.MaximumSize = new Size(0, MaximunItems * _checkedListBox.Font.Height);
            _checkedListBox.SelectedIndexChanged += _checkedListBox_SelectedIndexChanged;
            this.Controls.Add(_checkedListBox);
        }

        public Label Label { get; set; }

        private ToolTip _tooltip;
        public ToolTip ToolTip
        {
            get
            {
                return _tooltip;
            }
            set
            {
                _tooltip = value;
                if (Label != null && _tooltip != null && WorkItemFieldName != null && _workItem != null)
                {
                    Field field = _workItem.Fields[WorkItemFieldName];
                    _tooltip.SetToolTip(Label, String.Format(CultureInfo.CurrentCulture, "{1}" + Environment.NewLine + "Field Name: {0}", field.FieldDefinition.Name, field.FieldDefinition.HelpText));
                }
            }
        }


        public event EventHandler AfterUpdateDatasource;
        public event EventHandler BeforeUpdateDatasource;

        public void Clear()
        {
            _checkedListBox.ClearSelected();
        }

        public void FlushToDatasource()
        {
            BindDataToField();
        }

        public void InvalidateDatasource()
        {
            BindDataToControl();
        }

        public StringDictionary Properties { get; set; }

        public bool ReadOnly { get; set; }

        public void SetSite(IServiceProvider serviceProvider)
        {
        }


        private WorkItem _workItem;
        public object WorkItemDatasource
        {
            get
            {
                return _workItem;
            }
            set
            {
                _workItem = value as WorkItem;
            }
        }

        public string WorkItemFieldName { get; set; }

        void _checkedListBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindDataToField();
        }
       
        private void BindDataToControl()
        {
            try
            {
                if (_workItem == null || _workItem.Fields[WorkItemFieldName] == null || _workItem.Fields[WorkItemFieldName].FieldDefinition == null)
                {
                    return;
                }

                var fieldValue = _workItem.Fields[WorkItemFieldName].Value.ToString();
                BindAllowedValues();
                SetCheckedItem(fieldValue);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "CheckboxListControl", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void BindDataToField()
        {
            try
            {
                if (_workItem == null || _workItem.Fields[WorkItemFieldName] == null || _workItem.Fields[WorkItemFieldName].FieldDefinition == null)
                {
                    return;
                }

                var value = GetValueFromCheckedListBox();
                _workItem.Fields[WorkItemFieldName].Value = value;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "CheckboxListControl", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private string GetValueFromCheckedListBox()
        {
            string text = String.Empty;
            foreach (var checkedItem in this._checkedListBox.CheckedItems)
            {
                if (text.Trim().Length != 0)
                {
                    text = text + ",";
                }
                text = text + checkedItem.ToString();
            }
            return text;
        }

        private void BindAllowedValues()
        {

            var allowedValues = this._workItem.Fields[WorkItemFieldName].AllowedValues;
            _checkedListBox.Items.Clear();
            
            //populate the list
            for (var i = 0; i < allowedValues.Count; i++)
            {
                if (allowedValues[i].Trim().Length > 2)
                {
                    _checkedListBox.Items.Add(allowedValues[i]);
                }
            }
        }

        private void SetCheckedItem(string text)
        {
            for (var i = 0; i < _checkedListBox.Items.Count; i++)
            {
                _checkedListBox.SetItemChecked(i,
                    text.IndexOf(_checkedListBox.Items[i].ToString(), StringComparison.OrdinalIgnoreCase) != -1);
            }
        }
        
       
    }
}
