export default {
  getSWData (context, SWItemID) {
    return new Promise((resolve, reject) => {
      context.axios.get(`https://swapi.co/api/${SWItemID}`,
        {
          timeout: 10000 // TODO: handle timeout!
        }).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          if(error.response.status === 404) {
            context.$swal('404', "These aren't the Droids you're looking for. . .", 'error')
          } else {
            context.$swal('Connection Fail', '', 'error')
          }
          reject(error);
        });
    });
  },
  getWeatherData (context, coords) {
    const key = '6521fda1207eae043017412fa964c906';
    return new Promise((resolve, reject) => {
      context.axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${key}`,
        {
          timeout: 10000
        }).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          if(error.response.status === 404) {
            context.$swal('404', "", 'error')
          } else {
            context.$swal('Connection Fail', '', 'error')
          }
          reject(error);
        });
    });
  },
  getPlanetCoords(planetClimate) {
    if (planetClimate) {
      return {lat: 35, lon: 139}
    } else {
      return {lat: 0, lon: 0} // Just a temporary fallback
    }
    // switch (planetClimate) {
    //   case '':
    //     // statements_1
    //     break;
    //   default:
    //     // statements_def
    //     break;
    // }
  },
  processWeatherData(weatherData) {
    console.log(weatherData) // REMOVE
    // TODO: get the REAL weatherData and make some calculations!
    const fakeData = Array.from({length: 12}, () => Math.floor(Math.random() * 350));
    return fakeData
  }
}
