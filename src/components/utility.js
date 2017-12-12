import * as moment from "moment";
import userInterfaceStore from "../store/userInterfaceStore";
import * as _ from "lodash";

export const getDateFromWeek = (week, year, unix) => {
  var date = moment()
    .day("Monday")
    .year(year)
    .week(week)
    .toDate();
  return unix ? moment(date).unix() : moment(date).format("LL");
};

export const calculateChange = data => {
  var y2 = data.value[data.value.length / 2 - 1];
  var y1 = data.value[data.value.length / 2 - 3];
  var percent = parseFloat((y2 - y1) / y1 * 100).toFixed(2);
  var valuta = parseFloat(y2 - y1).toFixed(2);
  return { percent, valuta };
};

export const computeData = (data, timeData, timespan) => {
  var salmonType = userInterfaceStore.getInterface().salmonType;
  var time = Object.keys(timeData);
  time.push.apply(time, Object.keys(timeData));
  var computedData = [];
  data.value.forEach((e, i) => {
    if (
      i % 2 === 0 &&
      (salmonType === 0
        ? i < data.value.length / 2
        : i >= data.value.length / 2)
    ) {
      var timeUTC = getDateFromWeek(
        time[i / 2].slice(5),
        time[i / 2].slice(0, 4),
        true
      );
      var timeMonth = Math.ceil(Date.now() / 1000) - 86400 * timespan;
      if (timeUTC < timeMonth) return;
      var object = {
        time: timeUTC,
        price: data.value[i + 1],
        volume: data.value[i]
      };
      computedData.push(object);
    }
  });
  return computedData;
};

export const filterUpdate = (data, state) => {
  var update = {};
  _.map(data, (e, i) => {
    _.map(state, el => {
      if (e !== el) {
        update[i] = e;
      }
    });
  });
  return update;
};
