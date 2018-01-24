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

//Write a JavaScript program to convert a number to a string.
function makeAString(num){
  return num.toString();
}
makeAString(5);

//Write a JavaScript program to convert a string to the number.
function stringToNumber(str){
  return Number(str);
}
stringToNumber('42');

/*Write a JavaScript program that takes in different datatypes and prints out whether they are a:
Boolean
Null
Undefined
Number
NaN
String*/

function findType(arg){
  return typeof arg;
}
findType('hello');

//Write a JavaScript program that adds 2 numbers together.
function sumOfTwoNums(num1, num2){
  return num1 + num2;
}
sumOfTwoNums(5, 5);

//Write a JavaScript program that runs only when 2 things are true.
function bothMustBeTrue(arg1, arg2){
  if (arg1 && arg2){
    return 'Both are true!';
  } else {
    return 'Try again.';
  }
}
bothMustBeTrue(1, true);

//Write a JavaScript program that runs when 1 of 2 things are true.
function oneMustBeTrue(arg1, arg2) {
  if (arg1 || arg2){
    return 'One is true!';
  } else {
    return 'Try again.';
  }
}
oneMustBeTrue(0, true);

//Write a JavaScript program that runs when both things are not true.
function neitherCanBeTrue(arg1, arg2){
  if (!arg1 && !arg2){
    return 'Neither are true!';
  } else {
    return 'Try again.';
  }
}
neitherCanBeTrue(0, false); 
