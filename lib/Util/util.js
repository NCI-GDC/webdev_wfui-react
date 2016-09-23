"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var WFUIJS = WFUIJS || {};

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var timestampToDate = function timestampToDate(timestamp, type) {
    if (!type) type = 1;
    if (timestamp == 0) return;
    var date = new Date(timestamp * 1000); //unix
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    switch (type) {
        case 1:
            //Default
            return dayNames[date.getDay()] + ", " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            break;

        case 2:
            return dayNames[date.getDay()] + ", " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + strTime + ", " + date.getFullYear();
            break;

        case 3:
            return monthNamesShort[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            break;
    }
};

var validateEmail = function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var capitalize = function capitalize(string) {
    return string.replace(/\b[a-z]/g, function (f) {
        return f.toUpperCase();
    });
};

var scrollTop = function scrollTop() {
    var _$;
    if (WFUIJS.$) {
        _$ = WFUIJS.$;
    } else if ($) {
        _$ = $;
    }
    if (_$) _$("html, body").animate({ scrollTop: _$(".jumper").offset().top }, 'fast');
};

exports.default = {
    dayNames: dayNames,
    monthNames: monthNames,
    monthNamesShort: monthNamesShort,
    timestampToDate: timestampToDate,
    validateEmail: validateEmail,
    capitalize: capitalize,
    scrollTop: scrollTop
};