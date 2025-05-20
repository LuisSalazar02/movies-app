import api from "../api";

export const getPopularMovies = async (page = 1) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any;
  const endpoint = `/movie/popular?language=en-US&page=${page}`;
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
};
