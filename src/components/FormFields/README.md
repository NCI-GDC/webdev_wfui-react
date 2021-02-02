*Description*
This is a common component used by all form field render components to display description (additional information/detailed description) of a component.

*renderAddAnother*

|Name|Type (default value)|Desc|
|----|--------------------|----|
|className|string|Class name of the wrapper|
|help|string|Help text to be displayed below the component|
|label|string|Label|
|labelAddAnother|String (‘Add another item’)|Label of the add another item button|
|required|bool|If true, display an asterisk indicating the field is required |
|disabled|bool|If true, the field is disabled|
|preview|bool|If true, the component is for previewing the answer, so the values are set but disabled.|
|draggable|bool|If true, items can be dragged and dropped to change the order|
|withContext|bool|If true, include context|
|minimumItem|Number (0)|Minimum number of items required|
|descDisplay|element|Defines the component to be displayed as a description|
|fullWidth|Bool (false)|If true, the field is full width|
|defaultValue|Object (null)|Set default values|

*renderAutoComplete*
This component is used to display autocomplete list given a part of a keyword. (E.g. for search, for cud search)

* Point to the code 

|Name|Type (default value)|Description|
|----|--------------------|-----------|
|queryInterval|Number (100)|Number of milliseconds before next auto-complete search request|
|textNoResult|String (‘No results available’)|Text to be displayed when there is no result available|
|fullWidth|Bool (false)|If yes, the component is full width (100%)|

*renderCheckboxes*
This component is for checkbox form field.
