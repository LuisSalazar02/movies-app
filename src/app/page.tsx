"use client";

import React, { useEffect, useState } from "react";
import MovieSlider from "@/components/MovieSlider/MovieSlider";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";
import { IMovieDetail } from "@/types/MovieDetail";

export default function Home() {
  const [popular, setPopular] = useState<IMovieDetail[]>([]);
  const [nowPlaying, setNowPlaying] = useState<IMovieDetail[]>([]);
  const [upcoming, setUpcoming] = useState<IMovieDetail[]>([]);

  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularMovies();
        setPopular(data.results);
      } catch (error) {
        console.error("Error loading popular movies:", error);
      } finally {
        setLoadingPopular(false);
      }
    };
    fetchPopular();
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await getNowPlayingMovies();
        setNowPlaying(data.results);
      } catch (error) {
        console.error("Error loading now playing movies:", error);
      } finally {
        setLoadingNowPlaying(false);
      }
    };
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const data = await getUpcomingMovies();
        setUpcoming(data.results);
      } catch (error) {
        console.error("Error loading upcoming movies:", error);
      } finally {
        setLoadingUpcoming(false);
      }
    };
    fetchUpcoming();
  }, []);

  return (
    <div className="p-6 space-y-12">
      {loadingPopular ? (
        <p className="text-gray-500 text-sm">Loading Popular Movies...</p>
      ) : (
        <MovieSlider title="What's Popular" movies={popular} />
      )}

      {loadingNowPlaying ? (
        <p className="text-gray-500 text-sm">Loading Now Playing...</p>
      ) : (
        <MovieSlider title="Now Playing" movies={nowPlaying} />
      )}

      {loadingUpcoming ? (
        <p className="text-gray-500 text-sm">Loading Upcoming...</p>
      ) : (
        <MovieSlider title="Upcoming" movies={upcoming} />
      )}
    </div>
  );
}
