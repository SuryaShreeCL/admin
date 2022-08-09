import moment from "moment";

export const secondsToHms = (second) => {
  if (second > 0) {
    let d = Number(second);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    return `${h > 10 ? h : `0${h}`}:${m > 10 ? m : `0${m}`}:${
      s > 10 ? s : `0${s}`
    }`;
  } else if (second === 0) {
    return `00:00:00`;
  } else {
    return null;
  }
};

export const customDateFormat = (date, format) => {
  var newDate = null;
  if (date) newDate = moment(new Date(date)).format(format);
  return newDate;
};

export const minutesToTime = (minutes) => {
  if (minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ${Math.floor(m)} min` : `${m.toFixed(2)} mins`}`;
  } else return `0.00 mins`;
};
