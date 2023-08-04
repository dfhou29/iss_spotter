const request = require('request');
const {IP_API, COORDS_API, FLYOVER_API} = require('./constants');
const fetchMyIP = (callback) => {
  request(IP_API, (error, response, body) => {
    // request failed
    if (error) {
      callback(error, null);
      return;
    }
    // status code error
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // successful request
    const IP = JSON.parse(body).ip;
    callback(null, IP);
  });
};

const fetchCoordsByIP = (IP, callback) => {

  request(COORDS_API + IP, (error, response, body) => {
    // request failed
    if (error) {
      callback(error, null);
      return;
    }

    // status code error
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. response: ${body}`;
      callback(Error(msg), null);
      //return;
    }

    // invalid IP
    const data = JSON.parse(body);
    if (!data.success) {
      const msg = data.message;
      callback(Error(msg), null);
      //return;
    }

    //request success
    const latitude = data.latitude;
    const longitude = data.longitude;
    const coordinates = {
      latitude: latitude,
      longitude: longitude
    };

    callback(null, coordinates);
  });

};

const fetchISSFlyOverTimes = (coordinates, callback) => {
  request(`${FLYOVER_API}lat=${coordinates.latitude}&lon=${coordinates.longitude}&alt=1&n=5`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. response: ${body}`;
      callback(msg, null);
      return;
    }

    let data = JSON.parse(body).response;

    callback(null, data);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, IP) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(IP, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, flyOverData) => {
        if (error) {
          return callback(error, null);
        }

          callback(null, flyOverData);
      })
    })
  })
}


module.exports = {
  nextISSTimesForMyLocation
};
