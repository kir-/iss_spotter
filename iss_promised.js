// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(ipString) {
  const ip = JSON.parse(ipString).ip;
  return request(`https://ipvigilante.com/${ip}`);
};
const fetchISSFlyOverTimes = function(coordString) {
  let {latitude, longitude} = JSON.parse(coordString).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };