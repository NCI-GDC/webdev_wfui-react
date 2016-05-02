WFUIJS.RCT = WFUIJS.RCT || {};

WFUIJS.RCT.Tab_1_TabsSwitcher = React.createClass({
  onClick: function(item) {
    this.props.data.onTabClick(item);
  },
  render: function() {
    var tabs = [];
    var activeId = this.props.data.activeTabId;
    this.props.data.tabs.map(function(individualTab, i){
      if (individualTab.id == activeId) {
        tabs.push (
          <li className="menu-item active-tab" key={i}><a 
          href={"#"+activeId} onClick={this.onClick.bind(this,individualTab)}>
          <span className="tab_dot"></span>
          <strong>{individualTab.title}</strong></a></li>
        );
      }
      else{
        tabs.push (
          <li className="menu-item" key={i}><a 
          href={"#"+activeId} onClick={this.onClick.bind(this,individualTab)}>
          <span className="tab_dot"></span>
          <strong>{individualTab.title}</strong></a></li>
        );
      }
    }.bind(this));

    return(
      <ul className="tabs-menu">
        {tabs}
      </ul>
    );
  }


});


WFUIJS.RCT.Tab_1_Content = React.createClass({
  render: function() {
    var activeId = this.props.data.activeTabId;
    var contents = [];

    return(
      <div>
        {this.props.data.tabs.map(function(individualTab, i){
          //check if tab should be active or not
          if (individualTab.id == activeId){
            var classesName = "tabs-pane active-pane";
          }else{
            classesName = "tabs-pane";
          }

          //check if component or html string is passed
          if (typeof individualTab.content == 'string'){
            contents.push(
                        <div className={classesName} key={i} dangerouslySetInnerHTML={{__html: individualTab.content}}>
                        </div>
                        );
          }
          else {//component
          contents.push(
                        <div className={classesName} key={i}>
                        <individualTab.content.component {...individualTab.content.props} />
                        </div>
                        );
          }
        })}
        {contents}
      </div>
    );
  }


});


WFUIJS.RCT.Tabs_1 = React.createClass({
  getInitialState: function() {
    var initialId;
    for(var i = this.props.data.tabs.length-1; i>=0; i--){
      if (this.props.data.tabs[i].is_current){
        initialId = this.props.data.tabs[i].id;
      }
    }
    return {
      activeTabId: initialId ? initialId : 1,
    };
  },
  handleTabClick: function(item){
    if(this.mounted){
      this.setState({
        activeTabId: item.id,
      });
    }
  },
  onHashChange: function(e){
      if(e.isTrusted){
          this.handleTabClick({id: window.location.hash.substring(1)});
      }
  },
  componentDidMount: function(){
    this.mounted = true;
    window.addEventListener("hashchange", this.onHashChange);
  },
  componentWillUnMount: function(){
    this.mounted = false;
    window.removeEventListener("hashchange", this.onHashChange);
  },
  render: function() {
    
    if(typeof this.props.data == 'string'){
      var data = this.props.data;
    }else{
      data = this.props.data;
    }

    return (
      <div className="wfui-tabs horizontal-tabs">
        <WFUIJS.RCT.Tab_1_TabsSwitcher data={{'tabs':data.tabs,'activeTabId':this.state.activeTabId,'onTabClick':this.handleTabClick}} />
        <WFUIJS.RCT.Tab_1_Content data={{'tabs':data.tabs,'activeTabId':this.state.activeTabId}} />
      </div>
    );
  }
});
