const request = require('request-promise-native');
const {IP_API, COORDS_API, FLYOVER_API} = require('./constants');

const fetchMyIP = () => {
  return request(IP_API);
};

const fetchCoordsByIP = (data) => {
  const IP = JSON.parse(data).ip;
  return request(COORDS_API + IP);
};

const fetchISSFlyOverTimes = (data) => {
  const lat = JSON.parse(data).latitude;
  const lon = JSON.parse(data).longitude;
  return request(`${FLYOVER_API}lat=${lat}&lon=${lon}&alt=1&n=5`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response;
    });
};

module.exports = {
  nextISSTimesForMyLocation
};