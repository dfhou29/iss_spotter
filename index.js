const {nextISSTimesForMyLocation} = require('./iss');


// fetchMyIP((error, IP) => {
//   console.log(error ? error : IP);
// });
//
// fetchCoordsByIP("38.41.214.110", (error, coordinates) => {
//   console.log(error ? error : coordinates);
// });
//
// const coordinates = { latitude: 49.2827291, longitude: -123.1207375 };
//
// fetchISSFlyOverTimes(coordinates, (error, flyOverData) => {
//   console.log(error ? error : flyOverData);
// });

nextISSTimesForMyLocation((error, flyOverData) => {
  if (error) {
    console.log("Error!", error);
  }
  else {
    for (const data of flyOverData) {
      console.log(`risetime: ${data.risetime}, duration: ${data.duration}`);
    }
  }
});

