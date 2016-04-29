(function($){

  WFUIJS.RCT = WFUIJS.RCT || {};
  var AppDispatcher = WFUIJS.modules.AppDispatcher;
  var EventEmitter = WFUIJS.modules.EventEmitter;
  var assign = WFUIJS.modules.assign;
  var TOGGLE_DROPDOWN_TRIGGERD_CLICKED = "toggle_dropdown_triggered";

  var Dropdown_2_Receiver = assign({}, EventEmitter.prototype, {

          emitEvent: function(eventtype, res) {
              this.emit(eventtype, res);
          }, 
          addEventListener: function(eventtype, callback) {
              this.on(eventtype, callback);
          },
          removeEventListener: function(eventtype,callback) {
              this.removeListener(eventtype, callback);
          },
          dispatcherIndex: AppDispatcher.register(function(payload) {
              let action = payload.action;
              switch(action.actionType) {
                  case 'toggleDropdownMenu':
                    Dropdown_2_Receiver.emitEvent(TOGGLE_DROPDOWN_TRIGGERD_CLICKED, payload.action.data);
                    break;
              }
          })

  });

  class Dropdown_2 extends React.Component{
      constructor(){
          super();
          this.state = {
            open: false,
            left: 0,
            top: 0,
          }
          this._onToggle = this._onToggle.bind(this);
          this._onHide = this._onHide.bind(this);
      }
      componentDidMount(){
          const that = this;
          Dropdown_2_Receiver.addEventListener(TOGGLE_DROPDOWN_TRIGGERD_CLICKED, this._onToggle);
          window.addEventListener('click', this._onHide);
      }
      componentWillUnmount() {
          Dropdown_2_Receiver.removeEventListener(TOGGLE_DROPDOWN_TRIGGERD_CLICKED, this._onToggle);
          window.removeEventListener('click', this._onHide);
      }
      _onShow(){
        if(!this.state.open){
          this.setState({ open: true });
        }
      }
      _onHide(e){
        if(this.state.open){
          this.setState({ open: false });
        }
      }
      _onToggle(data){
        data.event.stopPropagation();
        
        //Set Dropdown Status
        this.setState({
          id: data.dropdown.uid,
          left: WFUIJS.$(data.el).offset().left,
          top: WFUIJS.$(data.el).offset().top + WFUIJS.$(data.el).outerHeight(),
          dropdown: data.dropdown,
        })

        //Toggle open/close
        if(!this.state.open){
          this._onShow();
        }else{
          if(this.state.id == data.dropdown.uid){
            this._onHide();
          }
        }

      }
      render(){
        let sections;
        if(this.state.dropdown && this.state.dropdown.sections){
          sections = this.state.dropdown.sections.map(function(section, i){
            let title;
              if(section.title){
                title = <strong>{section.title.content}</strong>
              }
              return (
                <div key={i} className="wfui-dropdown3-section">
                  {title}
                  <ul>
                  {section.items.map(function(item, j){
                    return <li key={j}><a href={item.href || "#"} onClick={item.onClick}>{item.content}</a></li>
                  })}
                  </ul>
                </div>
              )
          })
        }
        if(this.state.open){
          return (
            <div className="wfui-dropdown3 wfui-style-default" style={{display: 'block',left: this.state.left, top:this.state.top }}>
              {sections}
            </div>
          )
        }else{
          return <noscript />
        }
      }
      componentDidUpdate(){
        if( this.state.left + $('.wfui-dropdown3').width() > $(window).width()){
          $('.wfui-dropdown3').css({left: 0});
          $('.wfui-dropdown3').css({left: this.state.left - $('.wfui-dropdown3').width() + 30 });
        }
      }

  } 
  WFUIJS.RCT.Dropdown_2 = Dropdown_2;
  
  //Render it
  if(WFUIJS.$('#wfui_dropdown_2').length == 0 && WFUIJS.RCT.Dropdown_2){
    WFUIJS.$('body').append('<div id="wfui_dropdown_3"></div>')
    WFUIJS.RCT.render('dropdown', 2, 'wfui_dropdown_3');
  }

})(WFUIJS.$)