tfswitcustomcontrols
====================

Team Foundation Server 2013 Work Item Custom Controls for TFS Web access and Visual Studio. TFS provides built-in controls to customize work item types, which may not meet specific requirements. TFS provide lot of extensibility points to customize the work items to match the specific requirements. Here, we will publish set of custom controls which can address the common requirements of TFS work item tracking customization.


CheckboxListControl


TFS 2013 doen't have any built-in type for checkbox list. CheckboxListControl provide the user to select multliple items from the list of items displayed as Check boxes. 

Usage:
	&lt;Control FieldName="My.Days" Type="CheckboxListControl" Label="Days" LabelPosition="Left" /&gt;


HtmlSmallControl

TFS 2013 contains HtmlFieldsControl to display the Html field, which uses predefined minimum height and we don’t have any option to reduce the height. HtmlSmallControl, based on TFS RichText control accept the height prvided as part of Attributes or the default height of 150px. We will use the fallback mechanism to display the field using HtmlFieldControl in Visual Studio.

Usage:
	&lt;Control FieldName="Project.Msg" Type="HtmlSmallControl" PreferredType="HtmlFieldControl"  Height="50px" Label="Message" LabelPosition="Left" /&gt;


TextAreaControl

Sample control to show how we can develop work item custom controls using JavaScript and Html.

Usage:
	&lt;Control FieldName="Project.Msg" Type="TextAreaControl" PreferredType="FieldControl"  Label="Message" LabelPosition="Left" /&gt;
