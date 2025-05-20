import api from "../api";
import { IMovieDetail } from "@/types/MovieDetail";

interface MovieListResponse {
  page: number;
  results: IMovieDetail[];
  total_pages: number;
  total_results: number;
}

export const getRecommendedMovies = async (
  id: string
): Promise<MovieListResponse> => {
  try {
    const response = await api.get<MovieListResponse>(
      `/movie/${id}/recommendations?language=en-US`
    );
    return response.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.status_message ||
        "Failed to fetch recommended movies"
    );
  }
};
