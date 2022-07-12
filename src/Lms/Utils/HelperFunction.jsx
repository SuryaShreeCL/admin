import moment from "moment";

export const secondsToHms = (second) => {
  if (second) {
    let d = Number(second);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    return `${h > 10 ? h : `0${h}`}:${m > 10 ? m : `0${m}`}:${
      s > 10 ? s : `0${s}`
    }`;
  } else {
    return null;
  }
};

export const customDateFormat = (date, format) => {
  var newDate = null;
  if (date) newDate = moment(new Date(date)).format(format);
  return newDate;
};
