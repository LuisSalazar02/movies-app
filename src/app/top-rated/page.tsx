"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMovieDetail } from "@/types/MovieDetail";
import MovieList from "@/components/MovieList/MovieList";

const TopRatedPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const data = await getTopRatedMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        console.log(movies);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [page]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Top Rated</h3>
      {/* Loading indicator */}
      {loading ? (
        <h5 className="text-lg text-gray-500">Loading...</h5>
      ) : (
        <div>
          {/* Grid Layout */}
          <MovieList movies={movies} />
          {/* Paginator */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="p-2 bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="px-4 py-2 text-lg font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRatedPage;
