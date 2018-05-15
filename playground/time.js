const moment = require("moment");

var date = moment();
date.add(-1, "year");
// console.log(date.format("MMM YYYY, dddd Do"));

var time = moment().format("h:mm a");
// console.log(time);

var someTime = moment().valueOf();

console.log(someTime);
