'use strict';
export function showTimeLeft() {
  const date = new Date(),
      month = date.getMonth(),
      day = date.getDate(),
      hours = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds(),
      arrDayAtMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30,31],
      dayAtYear = 365;
  let daysFromStartYear = 0,
      dayLeft,
      hoursLeft,
      minLeft,
      secLeft,
      arrTimeNow=[];
  
  for(let i = 0; i < month; i++) {
    if (month === 0) {
      daysFromStartYear = day;
    } else {
      daysFromStartYear += arrDayAtMonth[i];
    }
  }
  daysFromStartYear = daysFromStartYear + day;
  dayLeft = dayAtYear - daysFromStartYear;
  hoursLeft = 24 - hours-1;
  minLeft = 60 - min-1;
  secLeft = 60 - sec;
  arrTimeNow.push(...[dayLeft, hoursLeft, minLeft, secLeft]);
  for (let j = 0; j < arrTimeNow.length; j++){
    if (arrTimeNow[j] < 10) {
      arrTimeNow[j] = `0${arrTimeNow[j]}`;
    }
  }
  const time = document.querySelector('.header-info__timer');
  time.textContent = `${arrTimeNow[0]} : ${arrTimeNow[1]} : ${arrTimeNow[2]} : ${arrTimeNow[3]}`;
  setTimeout(showTimeLeft, 1000);
}
