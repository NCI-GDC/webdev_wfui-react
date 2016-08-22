"use strict";

WFUIJS.RCT = WFUIJS.RCT || {};

WFUIJS.RCT.Tab_1_TabsSwitcher = React.createClass({
  displayName: "Tab_1_TabsSwitcher",

  onClick: function onClick(item) {
    this.props.data.onTabClick(item);
  },
  render: function render() {
    var tabs = [];
    var activeId = this.props.data.activeTabId;
    this.props.data.tabs.map(function (individualTab, i) {
      if (individualTab.id == activeId) {
        tabs.push(React.createElement(
          "li",
          { className: "menu-item active-tab", key: i },
          React.createElement(
            "a",
            {
              href: "#" + activeId, onClick: this.onClick.bind(this, individualTab) },
            React.createElement("span", { className: "tab_dot" }),
            React.createElement(
              "strong",
              null,
              individualTab.title
            )
          )
        ));
      } else {
        tabs.push(React.createElement(
          "li",
          { className: "menu-item", key: i },
          React.createElement(
            "a",
            {
              href: "#" + activeId, onClick: this.onClick.bind(this, individualTab) },
            React.createElement("span", { className: "tab_dot" }),
            React.createElement(
              "strong",
              null,
              individualTab.title
            )
          )
        ));
      }
    }.bind(this));

    return React.createElement(
      "ul",
      { className: "tabs-menu" },
      tabs
    );
  }

});

WFUIJS.RCT.Tab_1_Content = React.createClass({
  displayName: "Tab_1_Content",

  render: function render() {
    var activeId = this.props.data.activeTabId;
    var contents = [];

    return React.createElement(
      "div",
      null,
      this.props.data.tabs.map(function (individualTab, i) {
        //check if tab should be active or not
        if (individualTab.id == activeId) {
          var classesName = "tabs-pane active-pane";
        } else {
          classesName = "tabs-pane";
        }

        //check if component or html string is passed
        if (typeof individualTab.content == 'string') {
          contents.push(React.createElement("div", { className: classesName, key: i, dangerouslySetInnerHTML: { __html: individualTab.content } }));
        } else {
          //component
          contents.push(React.createElement(
            "div",
            { className: classesName, key: i },
            React.createElement(individualTab.content.component, individualTab.content.props)
          ));
        }
      }),
      contents
    );
  }

});

WFUIJS.RCT.Tabs_1 = React.createClass({
  displayName: "Tabs_1",

  getInitialState: function getInitialState() {
    var initialId;
    for (var i = this.props.data.tabs.length - 1; i >= 0; i--) {
      if (this.props.data.tabs[i].is_current) {
        initialId = this.props.data.tabs[i].id;
      }
    }
    return {
      activeTabId: initialId ? initialId : 1
    };
  },
  handleTabClick: function handleTabClick(item) {
    if (this.mounted) {
      this.setState({
        activeTabId: item.id
      });
    }
  },
  onHashChange: function onHashChange(e) {
    if (e.isTrusted) {
      this.handleTabClick({ id: window.location.hash.substring(1) });
    }
  },
  componentDidMount: function componentDidMount() {
    this.mounted = true;
    window.addEventListener("hashchange", this.onHashChange);
  },
  componentWillUnMount: function componentWillUnMount() {
    this.mounted = false;
    window.removeEventListener("hashchange", this.onHashChange);
  },
  render: function render() {

    if (typeof this.props.data == 'string') {
      var data = this.props.data;
    } else {
      data = this.props.data;
    }

    return React.createElement(
      "div",
      { className: "wfui-tabs horizontal-tabs" },
      React.createElement(WFUIJS.RCT.Tab_1_TabsSwitcher, { data: { 'tabs': data.tabs, 'activeTabId': this.state.activeTabId, 'onTabClick': this.handleTabClick } }),
      React.createElement(WFUIJS.RCT.Tab_1_Content, { data: { 'tabs': data.tabs, 'activeTabId': this.state.activeTabId } })
    );
  }
});