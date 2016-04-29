window.React = require('react');
window.ReactDOM = require('react-dom');

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');

//Dependencies
require('../../legacy/wfui-widget.0.js');
require('../../legacy/wfui-browser.0.js');
require('../../legacy/wfui-blanket.0');
require('../../legacy/wfui-layer.0.js');

require('../../src/Icon/icon');
require('../../src/Button/button');
require('../../src/Dialog/dialog');
const css = require('../../dist/wfui_bundle.css');

class DialogTest extends React.Component{
    _close(){
        this.hide();
    }
    render(){
        let config = {
            title: 'Are you sure you want to delete this participant?',
            size : "large",
            has_searchbox: true,
            has_close: true,
            content: "Are you sure you want to delete: <br>This action cannot be undone and all of the participant's personal and survey data will be permanently deleted from the system.",
            buttons: [
                {title: "Export" , is_primary:true, onClick: ()=>{} },
                {title: "Cancel" , onClick: this._close }
            ],
        }
        return (
            <div>
                <WFUIJS.RCT.Button_1 data={{ title: "Open Dialog", is_primary: true, onClick:()=>{ this.refs.dialog.show(); } }}/>
                <WFUIJS.RCT.Dialog2_1 ref="dialog" data={config} />
            </div>
        )
    }
}

ReactDOM.render( <DialogTest />, document.getElementById('dialog'));