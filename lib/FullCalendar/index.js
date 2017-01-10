'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fullcalendar = require('fullcalendar');

var _fullcalendar2 = _interopRequireDefault(_fullcalendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Finds active event source matching googleId, 
// adds id and classname for styling purposes
function addEventIdClass(googleId, id, className) {
    var sources = (0, _jquery2.default)("#calendar").fullCalendar('getEventSources');
    for (var i = 0; i < sources.length; i++) {
        if (sources[i].googleCalendarId == googleId) {
            sources[i].id = id;
            sources[i].className = className;
            break;
        }
    }
}

// Toggles event source matching googleId,
// linked to one of the four toggle buttons on top
function toggleEventSource(googleId, id, className) {
    var sources = (0, _jquery2.default)("#calendar").fullCalendar('getEventSources');
    var on = false;
    for (var i = 0; i < sources.length; i++) {
        if (sources[i].googleCalendarId == googleId) {
            on = true;
            break;
        }
    }
    if (on) {
        (0, _jquery2.default)("#calendar").fullCalendar('removeEventSource', googleId);
    } else {
        (0, _jquery2.default)("#calendar").fullCalendar('addEventSource', googleId);
        addEventIdClass(googleId, id, className);
    }
}

//Handles event popup
function eventClickHandler(event, jsEvent, view) {
    //Positioning from clicked element
    var offset = (0, _jquery2.default)(this).offset();
    var offsetX = (0, _jquery2.default)(this).width();
    console.log("offsetX: " + offsetX);
    var margin = 10;
    (0, _jquery2.default)("#event-popup").css({
        "display": "initial",
        "left": offset.left + margin + offsetX,
        "top": offset.top
    });

    //Getting event time formatting
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var start = new Date(event.start._i);
    var printDate = days[start.getUTCDay()] + ", " + months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear();
    if (event.end) {
        var end = new Date(event.end._i);
        var startMinutes = start.getUTCMinutes();
        var endMinutes = end.getUTCMinutes();
        var printTime = start.getUTCHours() + ":" + (startMinutes > 9 ? startMinutes : "0" + startMinutes) + " - " + end.getUTCHours() + ":" + (endMinutes > 9 ? endMinutes : "0" + endMinutes) + " UTC";
    }

    //Inserting event information
    (0, _jquery2.default)("#event-link").attr('href', event.url);
    (0, _jquery2.default)("#event-link").html(event.title);
    (0, _jquery2.default)("#event-time").html(printDate + "<br/>" + printTime);
    console.log(event.start);
    if (event.description) {
        (0, _jquery2.default)("#event-description").html(event.description);
    } else {
        (0, _jquery2.default)("#event-description").html("");
    }
    if (event.location) {
        (0, _jquery2.default)("#event-location").html(event.location);
    } else {
        (0, _jquery2.default)("#event-location").html("");
    }

    //Returning false prevents event linking to google calendar page
    return false;
}

//Inserts "UTC"
function eventRenderHandler(event, element) {
    console.log(element);
    element.find(".fc-time").append("<span class=\"timezone\"> UTC</span>");
}

// Placeholder calendars
var allSources = [{
    googleCalendarId: 'rs25l6f24k3bih03rqhha3snf8@group.calendar.google.com',
    id: 'calendar-1',
    className: 'event-source-1',
    timezone: 'UTC'
}, {
    googleCalendarId: 'est9cq04ufnc05eg3qoq0ig78s@group.calendar.google.com',
    id: 'calendar-2',
    className: 'event-source-2',
    timezone: 'UTC'
}];

var PNotify = function (_React$Component) {
    _inherits(PNotify, _React$Component);

    function PNotify() {
        _classCallCheck(this, PNotify);

        return _possibleConstructorReturn(this, (PNotify.__proto__ || Object.getPrototypeOf(PNotify)).apply(this, arguments));
    }

    _createClass(PNotify, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(_jquery2.default.fn);
            console.log(_fullcalendar2.default);

            (0, _jquery2.default)('#calendar').fullCalendar({
                //Temporary API key
                googleCalendarApiKey: 'AIzaSyBxG93xOFVuPVV69vsPNCBet9vE4LKyDnw',
                eventSources: allSources,
                timezone: 'UTC',
                timeFormat: 'H(:mm)',
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                height: 600,
                eventLimit: true,
                eventClick: eventClickHandler,
                eventRender: eventRenderHandler
            });

            //Toggles source, refreshes calendar
            (0, _jquery2.default)("#toggle-1").on("click", function () {
                toggleEventSource(allSources[0].googleCalendarId, allSources[0].id, allSources[0].className);
            });
            (0, _jquery2.default)("#toggle-2").on("click", function () {
                toggleEventSource(allSources[1].googleCalendarId, allSources[1].id, allSources[1].className);
            });

            //Closes event popup if click anywhere outside of it
            (0, _jquery2.default)(document).on("click", function (e) {
                if (!((0, _jquery2.default)(e.target).parents("#event-popup").length > 0) && !((0, _jquery2.default)(e.target).parents(".fc-day-grid-event").length > 0)) {
                    (0, _jquery2.default)("#event-popup").css("display", "none");
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'topbar' },
                    _react2.default.createElement(
                        'span',
                        null,
                        'Working Group Calendars'
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'toggle-bar' },
                        _react2.default.createElement(
                            'div',
                            { id: 'toggle-1' },
                            'Toggle 1'
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'toggle-2' },
                            'Toggle 2'
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'toggle-3' },
                            'Toggle 3'
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'toggle-4' },
                            'Toggle 4'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'calendar' },
                    _react2.default.createElement(
                        'div',
                        { id: 'event-popup' },
                        _react2.default.createElement('a', { id: 'event-link', target: '_blank' }),
                        _react2.default.createElement('div', { id: 'event-time' }),
                        _react2.default.createElement('span', { id: 'event-location' }),
                        _react2.default.createElement('span', { id: 'event-description' })
                    )
                )
            );
        }
    }]);

    return PNotify;
}(_react2.default.Component);

exports.default = PNotify;