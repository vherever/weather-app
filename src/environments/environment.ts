export const environment = {
  API: {
    WEATHER: {
      // URL: 'https://api.openweathermap.org/data/2.5/weather?appId=d4cec04e7716cc23e89ddd7d77914104',
      URL: 'https://api.openweathermap.org/data/2.5/onecall?appId=d4cec04e7716cc23e89ddd7d77914104&units=metric',
      KEY: 'd4cec04e7716cc23e89ddd7d77914104'
    },
    GEO: {
      //URL: 'https://ipapi.co/json/'
      URL: 'https://geo.geosurf.io/'
    },
    LOCATION: {
      URL: 'https://api.teleport.org/api/'
    }
  },
  environmentName: 'dev'
};
