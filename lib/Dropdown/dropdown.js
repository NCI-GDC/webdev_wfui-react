'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function ($) {

  WFUIJS.RCT = WFUIJS.RCT || {};
  var AppDispatcher = WFUIJS.modules.AppDispatcher;
  var EventEmitter = WFUIJS.modules.EventEmitter;
  var assign = WFUIJS.modules.assign;
  var TOGGLE_DROPDOWN_TRIGGERD_CLICKED = "toggle_dropdown_triggered";

  var Dropdown_2_Receiver = assign({}, EventEmitter.prototype, {

    emitEvent: function emitEvent(eventtype, res) {
      this.emit(eventtype, res);
    },
    addEventListener: function addEventListener(eventtype, callback) {
      this.on(eventtype, callback);
    },
    removeEventListener: function removeEventListener(eventtype, callback) {
      this.removeListener(eventtype, callback);
    },
    dispatcherIndex: AppDispatcher.register(function (payload) {
      var action = payload.action;
      switch (action.actionType) {
        case 'toggleDropdownMenu':
          Dropdown_2_Receiver.emitEvent(TOGGLE_DROPDOWN_TRIGGERD_CLICKED, payload.action.data);
          break;
      }
    })

  });

  var Dropdown_2 = function (_React$Component) {
    _inherits(Dropdown_2, _React$Component);

    function Dropdown_2() {
      _classCallCheck(this, Dropdown_2);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown_2).call(this));

      _this.state = {
        open: false,
        left: 0,
        top: 0
      };
      _this._onToggle = _this._onToggle.bind(_this);
      _this._onHide = _this._onHide.bind(_this);
      return _this;
    }

    _createClass(Dropdown_2, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var that = this;
        Dropdown_2_Receiver.addEventListener(TOGGLE_DROPDOWN_TRIGGERD_CLICKED, this._onToggle);
        window.addEventListener('click', this._onHide);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        Dropdown_2_Receiver.removeEventListener(TOGGLE_DROPDOWN_TRIGGERD_CLICKED, this._onToggle);
        window.removeEventListener('click', this._onHide);
      }
    }, {
      key: '_onShow',
      value: function _onShow() {
        if (!this.state.open) {
          this.setState({ open: true });
        }
      }
    }, {
      key: '_onHide',
      value: function _onHide(e) {
        if (this.state.open) {
          this.setState({ open: false });
        }
      }
    }, {
      key: '_onToggle',
      value: function _onToggle(data) {
        data.event.stopPropagation();

        //Set Dropdown Status
        this.setState({
          id: data.dropdown.uid,
          left: WFUIJS.$(data.el).offset().left,
          top: WFUIJS.$(data.el).offset().top + WFUIJS.$(data.el).outerHeight(),
          dropdown: data.dropdown
        });

        //Toggle open/close
        if (!this.state.open) {
          this._onShow();
        } else {
          if (this.state.id == data.dropdown.uid) {
            this._onHide();
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var sections = void 0;
        if (this.state.dropdown && this.state.dropdown.sections) {
          sections = this.state.dropdown.sections.map(function (section, i) {
            var title = void 0;
            if (section.title) {
              title = React.createElement(
                'strong',
                null,
                section.title.content
              );
            }
            return React.createElement(
              'div',
              { key: i, className: 'wfui-dropdown3-section' },
              title,
              React.createElement(
                'ul',
                null,
                section.items.map(function (item, j) {
                  return React.createElement(
                    'li',
                    { key: j },
                    React.createElement(
                      'a',
                      { href: item.href || "#", onClick: item.onClick },
                      item.content
                    )
                  );
                })
              )
            );
          });
        }
        if (this.state.open) {
          return React.createElement(
            'div',
            { className: 'wfui-dropdown3 wfui-style-default', style: { display: 'block', left: this.state.left, top: this.state.top } },
            sections
          );
        } else {
          return React.createElement('noscript', null);
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.state.left + $('.wfui-dropdown3').width() > $(window).width()) {
          $('.wfui-dropdown3').css({ left: 0 });
          $('.wfui-dropdown3').css({ left: this.state.left - $('.wfui-dropdown3').width() + 30 });
        }
      }
    }]);

    return Dropdown_2;
  }(React.Component);

  WFUIJS.RCT.Dropdown_2 = Dropdown_2;

  //Render it
  if (WFUIJS.$('#wfui_dropdown_2').length == 0 && WFUIJS.RCT.Dropdown_2) {
    WFUIJS.$('body').append('<div id="wfui_dropdown_3"></div>');
    WFUIJS.RCT.render('dropdown', 2, 'wfui_dropdown_3');
  }
})(WFUIJS.$);