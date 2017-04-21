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

require('./gcal.js');

require('./moment.js');

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
    var prevClass;
    var currClass = jsEvent.currentTarget.classList[5];
    var $eventPopup = (0, _jquery2.default)("#event-popup");
    var offset = (0, _jquery2.default)(this).offset();
    $eventPopup.css({
        "display": "initial",
        "left": offset.left,
        "top": offset.top - 35
    });
    if (prevClass) {
        $eventPopup.removeClass(prevClass);
    }
    $eventPopup.addClass(currClass);
    prevClass = currClass;

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
    //console.log(event.start);
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
    //console.log(element);
    element.find(".fc-time").append("<span class=\"timezone\"> UTC</span>");
}

var PNotify = function (_React$Component) {
    _inherits(PNotify, _React$Component);

    function PNotify() {
        _classCallCheck(this, PNotify);

        return _possibleConstructorReturn(this, (PNotify.__proto__ || Object.getPrototypeOf(PNotify)).apply(this, arguments));
    }

    _createClass(PNotify, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //console.log($.fn);
            //console.log(fullcalendar);
            var _props = this.props,
                sources = _props.sources,
                googleApiKey = _props.googleApiKey;

            var allSources = [];
            for (var i = 0; i < sources.length; i++) {
                allSources.push({
                    googleCalendarId: sources[i].googleCalendarId,
                    id: sources[i].id,
                    className: 'event-source-' + (i + 1),
                    timezone: 'UTC'
                });
            }

            (0, _jquery2.default)('#calendar').fullCalendar({
                //Temporary API key
                googleCalendarApiKey: googleApiKey,
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

            var _loop = function _loop(_i) {
                toggleNum = "#toggle-" + (_i + 1);

                (0, _jquery2.default)(toggleNum).on("click", function () {
                    toggleEventSource(allSources[_i].googleCalendarId, allSources[_i].id, allSources[_i].className);
                });
            };

            for (var _i = 0; _i < allSources.length; _i++) {
                var toggleNum;

                _loop(_i);
            }

            //Closes event popup if click anywhere outside of it
            (0, _jquery2.default)(document).on("click", function (e) {
                if (!((0, _jquery2.default)(e.target).parents("#event-popup").length > 0) && !((0, _jquery2.default)(e.target).parents(".fc-day-grid-event").length > 0)) {
                    (0, _jquery2.default)("#event-popup").css("display", "none");
                }
            });
        }
    }, {
        key: 'renderToggleLabels',
        value: function renderToggleLabels(sources) {
            var toggleLabels = [];
            for (var i = 0; i < sources.length; i++) {
                var name = sources[i].id;
                toggleLabels.push(_react2.default.createElement(
                    'label',
                    { className: 'checkbox-inline', idx: i },
                    _react2.default.createElement('input', { type: 'checkbox', id: "toggle-" + (i + 1), value: "show-" + (i + 1), defaultChecked: 'true' }),
                    name
                ));
            }
            return toggleLabels;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'header',
                        { className: 'header col-md-12 clearfix' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'pull-left' },
                            'Working Group Calendars'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'toggle-bar pull-right' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Show only:'
                            ),
                            this.renderToggleLabels(this.props.sources)
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-md-12' },
                        _react2.default.createElement(
                            'div',
                            { id: 'calendar', className: 'calendar' },
                            _react2.default.createElement(
                                'div',
                                { id: 'event-popup', className: 'event-popup' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'h5',
                                        null,
                                        _react2.default.createElement('a', { id: 'event-link', className: 'event-link', target: '_blank' })
                                    ),
                                    _react2.default.createElement('div', { id: 'event-day', className: 'event-day' }),
                                    _react2.default.createElement('div', { id: 'event-time', className: 'event-time' }),
                                    _react2.default.createElement('div', { id: 'event-location', className: 'event-location' }),
                                    _react2.default.createElement('div', { id: 'event-description', className: 'event-description' })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PNotify;
}(_react2.default.Component);

exports.default = PNotify;