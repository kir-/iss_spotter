// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP((ip),(error, longitude, latitude,)=>{
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log(latitude, longitude);
    fetchISSFlyOverTimes(latitude, longitude,(error,issInfo)=>{
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log(issInfo);
    });
  });
});

