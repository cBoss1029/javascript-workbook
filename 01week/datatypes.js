'use strict'

//Write a JavaScript program to display the current day and time.
function findTime(){
const now = new Date(); //find date
const date = (now.getMonth() + 1) + "/" + now.getDate(); //display month/day
const time = now.getHours() + ":" + now.getMinutes(); //display hour:minute
const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //array for day of the week
const day = dayArray[now.getDay()]; //get string day of week
const dateTime = "It is " + day + ", " + date + " at " + time + "."; //display time and date in string
return dateTime;
}

findTime();
