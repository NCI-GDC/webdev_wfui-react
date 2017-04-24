import React from 'react';
import $ from 'jquery';
import fullcalendar from 'fullcalendar';
import './gcal.js';
import './moment.js';

// Finds active event source matching googleId, 
// adds id and classname for styling purposes
function addEventIdClass(googleId, id, className) {
    var sources = $("#calendar").fullCalendar('getEventSources');
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
    var sources = $("#calendar").fullCalendar('getEventSources');
    var on = false;
    for (var i = 0; i < sources.length; i++) {
        if (sources[i].googleCalendarId == googleId) {
            on = true;
            break;
        }
    }
    if (on) {
        $("#calendar").fullCalendar('removeEventSource', googleId);
    }
    else {
        $("#calendar").fullCalendar('addEventSource', googleId);
        addEventIdClass(googleId, id, className);
    }
}

//Handles event popup
function eventClickHandler(event, jsEvent, view) {
    //Positioning from clicked element
    var prevClass;
    var currClass = jsEvent.currentTarget.classList[5];
    var $eventPopup = $("#event-popup");
    var offset = $(this).offset();
    $eventPopup.css({
        "display": "initial",
        "left": offset.left,
        "top": offset.top - 35,
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
    $("#event-link").attr('href', event.url);
    $("#event-link").html(event.title);
    $("#event-time").html(printDate + "<br/>" + printTime);
    //console.log(event.start);
    if (event.description) {
        $("#event-description").html(event.description);
    }
    else {
        $("#event-description").html("");
    }
    if (event.location) {
        $("#event-location").html(event.location);
    }
    else {
        $("#event-location").html("");
    }

    //Returning false prevents event linking to google calendar page
    return false;
}

//Inserts "UTC"
function eventRenderHandler(event, element) {
    //console.log(element);
    element.find(".fc-time").append("<span class=\"timezone\"> UTC</span>");
}

export default class PNotify extends React.Component {
    componentDidMount() {
        //console.log($.fn);
        //console.log(fullcalendar);
        const { sources, googleApiKey } = this.props;
        var allSources = [];
        for (let i = 0; i < sources.length; i++) {
            allSources.push({
                googleCalendarId: sources[i].googleCalendarId,
                id: sources[i].id,
                className: 'event-source-' + (i + 1),
                timezone: 'UTC'
            });
        }

        $('#calendar').fullCalendar({
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
        for (let i = 0; i < allSources.length; i++) {
            var toggleNum = "#toggle-" + (i + 1);
            $(toggleNum).on("click", function () {
                toggleEventSource(allSources[i].googleCalendarId, allSources[i].id, allSources[i].className);
            });
        }

        //Closes event popup if click anywhere outside of it
        $(document).on("click", function (e) {
            if (!($(e.target).parents("#event-popup").length > 0) && !($(e.target).parents(".fc-day-grid-event").length > 0)) {
                $("#event-popup").css("display", "none");
            }
        });
    }

    renderToggleLabels(sources) {
        var toggleLabels = [];
        for (let i = 0; i < sources.length; i++) {
            var name = sources[i].id;
            toggleLabels.push((
                <label className="checkbox-inline" idx={i}>
                    <input type="checkbox" id={"toggle-"+(i+1)} value={"show-"+(i+1)} defaultChecked="true"></input>{name}
                </label>
            ));
        }
        return toggleLabels;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <header className="header col-md-12 clearfix">
                        <h1 className="pull-left">Working Group Calendars</h1>
                        <div className="toggle-bar pull-right">
                            <span>Show only:</span>
                            {this.renderToggleLabels(this.props.sources)}
                        </div>
                    </header>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div id="calendar" className="calendar">
                            <div id="event-popup" className="event-popup">
                                <div>
                                    <h5><a id="event-link" className="event-link" target="_blank"></a></h5>
                                    <div id="event-day" className="event-day"></div>
                                    <div id="event-time" className="event-time"></div>
                                    <div id="event-location" className="event-location"></div>
                                    <div id="event-description" className="event-description"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
