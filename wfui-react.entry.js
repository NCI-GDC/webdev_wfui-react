/*****************************************************************
 * Own Components
 *****************************************************************/

var WFUIJS = {
    /**
     * Form components
     */
    Description : require('./src/Description/description.js').default,
    InputField : require('./src/InputField/input_field.js').default,
    InputTable : require('./src/InputTable/input_table.js').default,
    Selection : require('./src/Selection/selection.js').default,
    Grid : require('./src/Grid/grid.js').default,
    ListboxOption : require('./src/Listbox/listbox_option.js').default,
    Listbox : require('./src/Listbox/listbox.js').default,
    AnotherTable : require('./src/AddAnother/add_another.js').default,
    AddAnotherReducer : require('./src/AddAnother/reducers/reducers').default,
}
export default WFUIJS;