import React from 'react';
import $ from 'jquery';
import fullcalendar from 'fullcalendar';


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
    var offset = $(this).offset();
    var offsetX = $(this).width();
    console.log("offsetX: " + offsetX);
    var margin = 10;
    $("#event-popup").css({
        "display": "initial",
        "left": offset.left + margin + offsetX,
        "top": offset.top,
    });

    //Getting event time formatting
    var months = ["January", "February", "March","April","May","June","July","August","September","October","November","December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var start = new Date(event.start._i);
    var printDate = days[start.getUTCDay()] + ", " + months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear();
    if(event.end) {
        var end = new Date(event.end._i);
        var startMinutes = start.getUTCMinutes();
        var endMinutes = end.getUTCMinutes();
        var printTime = start.getUTCHours() + ":" + (startMinutes > 9 ? startMinutes : "0" + startMinutes) + " - " + end.getUTCHours() + ":" + (endMinutes > 9 ? endMinutes : "0" + endMinutes) + " UTC";
    }

    //Inserting event information
    $("#event-link").attr('href', event.url);
    $("#event-link").html(event.title);
    $("#event-time").html(printDate + "<br/>" + printTime);
    console.log(event.start);
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
    console.log(element);
    element.find(".fc-time").append("<span class=\"timezone\"> UTC</span>");
}

// Placeholder calendars
var allSources = [
    {
        googleCalendarId: 'rs25l6f24k3bih03rqhha3snf8@group.calendar.google.com',
        id: 'calendar-1',
        className: 'event-source-1',
        timezone: 'UTC'
    },
    {
        googleCalendarId: 'est9cq04ufnc05eg3qoq0ig78s@group.calendar.google.com',
        id: 'calendar-2',
        className: 'event-source-2',
        timezone: 'UTC'
    }
];


export default class PNotify extends React.Component {
    componentDidMount() {
        console.log($.fn);
        console.log(fullcalendar);

        $('#calendar').fullCalendar({
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
        $("#toggle-1").on("click", function () {
            toggleEventSource(allSources[0].googleCalendarId, allSources[0].id, allSources[0].className);
        });
        $("#toggle-2").on("click", function () {
            toggleEventSource(allSources[1].googleCalendarId, allSources[1].id, allSources[1].className);
        });
    
    //Closes event popup if click anywhere outside of it
        $(document).on("click",function(e) {
            if(!($(e.target).parents("#event-popup").length > 0) && !($(e.target).parents(".fc-day-grid-event").length > 0)) {
                $("#event-popup").css("display", "none");
            }
        });
    }
    render() {
        return (
            <div>
                <div id="topbar">
                    <span>Working Group Calendars</span>
                    <div id="toggle-bar">
                        <div id="toggle-1">Toggle 1</div>
                        <div id="toggle-2">Toggle 2</div>
                        <div id="toggle-3">Toggle 3</div>
                        <div id="toggle-4">Toggle 4</div>
                    </div>
                </div>        
                <div id="calendar">
                    <div id="event-popup">
                        <a id="event-link" target="_blank"></a>
                        <div id="event-time"></div>
                        <span id="event-location"></span>
                        <span id="event-description"></span>
                    </div>
                </div>
            </div>
        )
    }
}
