import api from "../api";
import { IMovieDetail } from "@/types/MovieDetail";

interface MovieListResponse {
  page: number;
  results: IMovieDetail[];
  total_pages: number;
  total_results: number;
}

export const getTopRatedMovies = async (
  page = 1
): Promise<MovieListResponse> => {
  try {
    const res = await api.get<MovieListResponse>(
      `/movie/top_rated?language=en-US&page=${page}`
    );
    return res.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.status_message || "Failed to fetch top rated movies."
    );
  }
};
