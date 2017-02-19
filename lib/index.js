'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import Draggable from './Draggable/Draggable';


var _reactBootstrap = require('react-bootstrap');

var bootstrap = _interopRequireWildcard(_reactBootstrap);

var _CaGForms = require('./CaGForms/');

var cagforms = _interopRequireWildcard(_CaGForms);

var _reactNotificationSystem = require('react-notification-system');

var _reactNotificationSystem2 = _interopRequireDefault(_reactNotificationSystem);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactTimezone = require('react-timezone');

var _reactTimezone2 = _interopRequireDefault(_reactTimezone);

var _FilteredList = require('./FilteredList/FilteredList');

var _FilteredList2 = _interopRequireDefault(_FilteredList);

var _Spinner = require('./Spinner/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _TwitterFeed = require('./TwitterFeed/TwitterFeed');

var _TwitterFeed2 = _interopRequireDefault(_TwitterFeed);

var _FilteredTable = require('./FilteredTable/FilteredTable');

var _FilteredTable2 = _interopRequireDefault(_FilteredTable);

var _PasswordValidator = require('./PasswordValidator/PasswordValidator');

var _PasswordValidator2 = _interopRequireDefault(_PasswordValidator);

var _Draggable = require('./Draggable.2/Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _DashboardBox = require('./DashboardBox/DashboardBox');

var _DashboardBox2 = _interopRequireDefault(_DashboardBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

require('./i18n/i18n.js');

module.exports = _extends({
    FilteredList: _FilteredList2.default,
    Spinner: _Spinner2.default,
    TwitterFeed: _TwitterFeed2.default,
    FilteredTable: _FilteredTable2.default,
    PasswordValidator: _PasswordValidator2.default,
    Draggable: _Draggable2.default,
    DashboardBox: _DashboardBox2.default,
    // Third Party Components
    NotificationSystem: _reactNotificationSystem2.default,
    Dropzone: _reactDropzone2.default,
    TimezonePicker: _reactTimezone2.default
}, bootstrap, cagforms);