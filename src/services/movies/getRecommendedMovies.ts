import api from "../api";

export const getRecommendedMovies = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any;
  const endpoint = `/movie/${id}/recommendations?language=en-US`;
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
