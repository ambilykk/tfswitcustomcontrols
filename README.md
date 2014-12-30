TFS 2013 Work Item custom Controls
====================

Team Foundation Server 2013 Work Item Custom Controls for TFS Web access and Visual Studio. 

TFS provides set of controls to customize the work items like Bug, testcase, and so on. Built-in controls are limited in number and functionality and often require new controls to support the project or organization specific requirements. 

TFS provides lot of extensibility points to develop new custom controls for web access and Visual Studio. This Repository is to publish set of custom controls which can address the common requirements of TFS work item customization to GitHub. Currently the collection consists of three web access controls and one Visual Studio control. More controls will be added to the repository. 


<b>CheckboxListControl</b>


TFS 2013 doen't have any built-in type for checkbox list. CheckboxListControl provide the user to select multliple items from the list of items displayed as Check boxes. 

Usage:<br/>
	&lt;Control FieldName="My.Days" Type="CheckboxListControl" Label="Days" LabelPosition="Left" /&gt;


<b>HtmlSmallControl</b>

TFS 2013 contains HtmlFieldsControl to display the Html field, which uses predefined minimum height and we don’t have any option to reduce the height. HtmlSmallControl, based on TFS RichText control accept the height prvided as part of Attributes or the default height of 150px. We will use the fallback mechanism to display the field using HtmlFieldControl in Visual Studio.

Usage:<br/>
	&lt;Control FieldName="Project.Msg" Type="HtmlSmallControl" PreferredType="HtmlFieldControl"  Height="50px" Label="Message" LabelPosition="Left" /&gt;


<b>TextAreaControl</b>

Sample control to show how we can develop work item custom controls using JavaScript and Html.

Usage:<br/>
	&lt;Control FieldName="Project.Msg" Type="TextAreaControl" PreferredType="FieldControl"  Label="Message" LabelPosition="Left" /&gt;
