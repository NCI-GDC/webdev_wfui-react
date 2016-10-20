'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToShowingProps = function mapStateToShowingProps(state) {
    return {
        pageFilter: state.visibilityFilterReducer.pageFilter
    };
};
var Showing = (_dec = (0, _reactRedux.connect)(mapStateToShowingProps), _dec(_class = function (_React$Component) {
    _inherits(Showing, _React$Component);

    function Showing() {
        _classCallCheck(this, Showing);

        return _possibleConstructorReturn(this, (Showing.__proto__ || Object.getPrototypeOf(Showing)).apply(this, arguments));
    }

    _createClass(Showing, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var numPerPage = _props.numPerPage;
            var total = _props.total;
            var pageFilter = _props.pageFilter;

            var showing = 0;
            if (pageFilter) {
                if (total > 0) {
                    if (pageFilter * numPerPage > total) {
                        showing = (pageFilter - 1) * numPerPage + 1 + "-" + total;
                    } else {
                        showing = (pageFilter - 1) * numPerPage + 1 + "-" + pageFilter * numPerPage;
                    }
                }
            } else {
                showing = numPerPage;
            }
            return _react2.default.createElement(
                'span',
                null,
                'Showing ',
                showing,
                ' of ',
                total
            );
        }
    }]);

    return Showing;
}(_react2.default.Component)) || _class);
exports.default = Showing;