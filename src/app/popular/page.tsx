"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieList from "@/components/MovieList/MovieList";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        console.log(movies);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, [page]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
      {/* Loading indicator */}
      {loading ? (
        <h5 className="text-lg text-gray-500">Cargando...</h5>
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

export default PopularClientPage;
