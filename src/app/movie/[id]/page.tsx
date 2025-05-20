"use client";

import { useEffect, useState } from "react";
import { IMovieDetail } from "@/types/MovieDetail";
import Image from "next/image";
import MovieCard from "@/components/MovieCard/MovieCard";
import { getMovieById } from "@/services/movies/getMovieById";
import { getRecommendedMovies } from "@/services/movies/getRecommendedMovies";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { guestSessionId } = useGuestSession();
  const [recommendedMovies, setRecommendedMovies] = useState<IMovieDetail[]>(
    []
  );

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie", err);
        setError("Could not load movie.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getRecommendedMovies(id);
        setRecommendedMovies(data.results);
      } catch (err) {
        console.error("Error fetching recommended movies", err);
        setError("Could not load recommended movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const newFavoriteState = !isFavorite;
    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);
      const storedFavorites = localStorage.getItem("favoriteMovieIds");
      const favoriteIds: number[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      const updatedFavorites = newFavoriteState
        ? [...new Set([...favoriteIds, movie.id])]
        : favoriteIds.filter((id) => id !== movie.id);
      localStorage.setItem(
        "favoriteMovieIds",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  if (loading) return <div>Loading movie...</div>;

  if (error) return <div>{error}</div>;

  if (!movie) return <div>No movie found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-full sm:w-64"
          width={300}
          height={450}
        />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="italic text-slate-500">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <div>
            <strong>Release:</strong> {movie.release_date.toString()}
          </div>
          <div>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </div>
          <div>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`px-4 py-2 rounded ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-bold w-max`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recommended Movies</h2>
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {recommendedMovies?.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3"
                >
                  <div className="p-2">
                    <Link
                      key={movie.id}
                      href={{
                        pathname: `/movie/${movie.id}`,
                        query: { from: "popular" },
                      }}
                    >
                      <MovieCard
                        title={movie.title}
                        voteAverage={movie.vote_average}
                        posterPath={movie.poster_path}
                        releaseYear={movie.release_date}
                        description={movie.overview}
                      />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
