'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabbedList = function (_React$Component) {
    _inherits(TabbedList, _React$Component);

    function TabbedList(props) {
        _classCallCheck(this, TabbedList);

        var _this = _possibleConstructorReturn(this, (TabbedList.__proto__ || Object.getPrototypeOf(TabbedList)).call(this, props));

        _this.state = {
            injectedElements: _this.injectOnClick(_this.props.children)
        };
        return _this;
    }

    _createClass(TabbedList, [{
        key: 'getActiveTagContents',
        value: function getActiveTagContents() {
            var injectedElements = this.state.injectedElements;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = injectedElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tab = _step.value;

                    if (tab.props.active) {
                        return tab.props.children;
                    }
                }

                /* If there is no active tab, then display the first tab */
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (injectedElements.length > 0) {
                this.handleTabClick(0);
            }

            /* Return an empty div when there is no tab. */
            return _react2.default.createElement('div', null);
        }
    }, {
        key: 'handleTabClick',
        value: function handleTabClick(clickedTabIndex) {
            var injectedElements = this.state.injectedElements;

            /* Clone the children */

            var tempChildren = injectedElements.slice(0);

            /* Remove active tags from others and inject 'active' class into ith element */
            for (var i = 0; i < injectedElements.length; i += 1) {
                var tab = injectedElements[i];
                if (i === clickedTabIndex) {
                    tempChildren[i] = _react2.default.cloneElement(tab, { active: true });
                } else {
                    tempChildren[i] = _react2.default.cloneElement(tab, { active: false });
                }
            }

            /* Update state with new elements */
            this.setState({ injectedElements: tempChildren });
        }
    }, {
        key: 'injectOnClick',
        value: function injectOnClick() {
            var _this2 = this;

            var injectedElements = [];

            var _loop = function _loop(i) {
                var tab = _this2.props.children[i];
                var injectedElem = _react2.default.cloneElement(tab, {
                    id: i,
                    onClick: function onClick() {
                        return _this2.handleTabClick(i);
                    }
                });
                injectedElements.push(injectedElem);
            };

            for (var i = 0; i < this.props.children.length; i += 1) {
                _loop(i);
            }
            return injectedElements;
        }
    }, {
        key: 'render',
        value: function render() {
            var injectedElements = this.state.injectedElements;


            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                injectedElements,
                _react2.default.createElement(
                    'div',
                    null,
                    this.getActiveTagContents()
                )
            );
        }
    }]);

    return TabbedList;
}(_react2.default.Component);

TabbedList.propTypes = {
    className: _react2.default.PropTypes.string,
    children: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element)
};

TabbedList.defaultProps = {
    className: '',
    children: {}
};

exports.default = TabbedList;