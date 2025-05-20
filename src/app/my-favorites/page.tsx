"use client";

import React, { useEffect, useState } from "react";
import { IMovieDetail } from "@/types/MovieDetail";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId, page);
        console.log(data);
        setMovies(data?.results || []);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [guestSessionId, page]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">My Favorite Movies</h3>
      {loading && <h5 className="text-lg text-gray-500">Loading...</h5>}
      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">{"You don't have any favorite movies yet."}</p>
          <p className="text-sm mt-2">
            {
              'Go to a movies detail page and click "Add to Favorites" to see it here.'
            }
          </p>
        </div>
      )}
      {!loading && movies.length > 0 && (
        <div>
          {/* Grid Layout */}
          <MovieList movies={movies} />

          {/* Paginator */}
          <div className="mt-10 flex justify-center items-center gap-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <span className="text-lg font-semibold text-gray-800">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Next Page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavoritesPage;
