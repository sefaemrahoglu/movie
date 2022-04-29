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

export const getPopularMovies = async () => {
  let result = [];
  for (let index = 1; index <= 10; index++) {
    const element = await axios.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=e843d1cf47fe07dc01958db4759ceb91&language=en-US&page=' +
        index
    );
    result = [...result, ...element.data.results];
  }
  return result;
};
