'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DashboardCardTitle = function DashboardCardTitle(_ref) {
    var role = _ref.role,
        className = _ref.className,
        title = _ref.title,
        image = _ref.image,
        imageAlt = _ref.imageAlt,
        left = _ref.left;
    return _react2.default.createElement(
        'div',
        { role: role, className: (0, _classnames2.default)(className, 'form-box-title') },
        _react2.default.createElement(
            'div',
            { className: 'form-box-title-box' },
            image && _react2.default.createElement('img', {
                src: image,
                className: 'form-box-title-image img-responsive',
                alt: imageAlt || 'title image'
            }),
            _react2.default.createElement(
                'h2',
                { className: 'form-box-title-text ' + (left ? 'text-left' : 'text-center') },
                title
            )
        )
    );
};

DashboardCardTitle.propTypes = {
    title: _propTypes2.default.node.isRequired,
    image: _propTypes2.default.string,
    imageAlt: _propTypes2.default.string,
    className: _propTypes2.default.string,
    role: _propTypes2.default.string,
    left: _propTypes2.default.bool
};

DashboardCardTitle.defaultProps = {
    role: 'title',
    left: false
};

exports.default = DashboardCardTitle;