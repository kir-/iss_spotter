/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

let request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, response, body,) => {
    // inside the request callback ...
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(err,JSON.parse(body).ip);
  });
  
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (err, response, body,) => {
    // inside the request callback ...
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body).data;
    let {latitude, longitude} = data;
    //let longitude = JSON.parse(body).longitude;

    callback(err, longitude, latitude);
  });
  
};

const fetchISSFlyOverTimes = function(latitude,longitude,callback) {
  // use request to fetch IP address from JSON API
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (err, response, body,) => {
    // inside the request callback ...
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(err,JSON.parse(body).response);
  });
  
};

// fetchMyIP();

module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes};
