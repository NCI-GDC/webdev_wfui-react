'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _description = require('../../src/Description/description');

var _description2 = _interopRequireDefault(_description);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

var htmlText1 = "<p><b>Welcome to the beginning of the survey Nancy.</b> Please take your time and answer all of the questions as honestly as possible. the survey will automatically save your answers, so you can come back and continue the survey at any time.</p><p>To begin, we will ask you a few basic questions about your demographics.</p>";
var htmlText2 = "<p><b>Welcome to the beginning of the survey Nancy.</b></p>";
var element1 = _react2.default.createElement(
	'div',
	null,
	_react2.default.createElement(
		'b',
		null,
		'Before you begin:'
	),
	_react2.default.createElement('br', null),
	_react2.default.createElement(
		'ol',
		null,
		_react2.default.createElement(
			'li',
			null,
			'Adjust your scale to zero;'
		),
		_react2.default.createElement(
			'li',
			null,
			'Weigh yourself with your clothes off, or wear light clothing. Remember to remove your shoes;'
		),
		_react2.default.createElement(
			'li',
			null,
			'Step on the scale. Make sure both feet are fully on the scale.'
		)
	)
);
var element2 = _react2.default.createElement(
	'div',
	null,
	'Hormonal contraceptives include birth control pills, implants, patches, injections, and rings or intra-uterine devices that release female hormones.'
);
var element3 = _react2.default.createElement(
	'div',
	null,
	_react2.default.createElement(
		'p',
		null,
		'The DIN is an 8 digit number that'
	)
);
_reactDom2.default.render(_react2.default.createElement(_description2.default, { content: 'simple text description', src: 'test.png', imageTitle: "imageTitle" }), document.getElementById('description1'));
_reactDom2.default.render(_react2.default.createElement(_description2.default, { type: 'theme-blue', classNames: 'extra-lalalalla awdawd' }), document.getElementById('description2'));
_reactDom2.default.render(_react2.default.createElement(_description2.default, { content: htmlText2, errors: 1, type: 'theme-purple', imageDescription: '' }), document.getElementById('description3'));
_reactDom2.default.render(_react2.default.createElement(_description2.default, { content: element1, type: 'theme-red' }), document.getElementById('description4'));
_reactDom2.default.render(_react2.default.createElement(
	_description2.default,
	{ content: element3, type: 'theme-purple' },
	_react2.default.createElement('img', { src: 'icon-cancer-types.svg', title: 'This is the image above' })
), document.getElementById('description5'));