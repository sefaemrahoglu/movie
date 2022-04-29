import axios from 'axios';

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = 'http://192.168.1.33:3000/';
    const token = 'e843d1cf47fe07dc01958db4759ceb91';

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
