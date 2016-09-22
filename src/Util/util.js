const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" , "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const timestampToDate = (timestamp, type) =>{
    if(!type) type = 1;
    if(timestamp == 0) return
    var date = new Date(timestamp * 1000);//unix
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    
    switch(type){
        case 1://Default
            return dayNames[date.getDay()] + ", " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            break;

        case 2:
            return dayNames[date.getDay()] +  ", " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + strTime + ", " + date.getFullYear();
            break;

        case 3:
            return monthNamesShort[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            break;
    }
}

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const capitalize = (string) => {
    return string.replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
}

const scrollTop = () => {
    WFUIJS.$("html, body").animate({scrollTop: $(".jumper").offset().top}, 'fast');
}

export default {
    dayNames,
    monthNames,
    monthNamesShort,
    timestampToDate,
    validateEmail,
    capitalize,
    scrollTop
}