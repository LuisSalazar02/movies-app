import { IMovieDetail } from "@/types/MovieDetail";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

interface MovieListProps {
  movies: IMovieDetail[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies?.map((movie) => (
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
      ))}
    </div>
  );
};

export default MovieList;
