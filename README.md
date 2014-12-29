tfswitcustomcontrols
====================

TFS 2013 Work Item Custom Controls for TFS Web access and Visual Studio


1. CheckboxListControl
TFS 2013 doen't have any built-in type for checkbox list. CheckboxListControl provide the user to select multliple items from the list of items displayed as Check boxes. 

Usage:
	<Control FieldName="My.Days" Type="CheckboxListControl" Label="Days" LabelPosition="Left" />


2. HtmlSmallControl

TFS 2013 contains HtmlFieldsControl to display the Html field, which uses predefined minimum height and we don’t have any option to reduce the height. HtmlSmallControl, based on TFS RichText control accept the height prvided as part of Attributes or the default height of 150px. We will use the fallback mechanism to display the field using HtmlFieldControl in Visual Studio.

Usage:
	<Control FieldName="Project.Msg" Type="HtmlSmallControl" PreferredType="HtmlFieldControl"  Height="50px" Label="Message" LabelPosition="Left" />


3. TextAreaControl
Sample control to show how we can develop work item custom controls using JavaScript and Html.

Usage:
	<Control FieldName="Project.Msg" Type="TextAreaControl" PreferredType="FieldControl"  Label="Message" LabelPosition="Left" />