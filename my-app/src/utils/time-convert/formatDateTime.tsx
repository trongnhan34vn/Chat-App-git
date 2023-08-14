export const formatDateTime = (date: Date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let nminutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + nminutes + ' ' + ampm;
  return strTime;
};
