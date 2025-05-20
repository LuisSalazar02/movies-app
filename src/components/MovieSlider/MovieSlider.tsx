"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { IMovieDetail } from "@/types/MovieDetail";

interface MovieSliderProps {
  title: string;
  movies: IMovieDetail[];
}

export default function MovieSlider({ title, movies }: MovieSliderProps) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <Link href={`/movie/${movie.id}`}>
                  <div className="p-2">
                    <div className="relative">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="rounded-lg object-cover w-full"
                      />
                      {/* Optional rating badge */}
                      {movie.vote_average && (
                        <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                          {Math.round(movie.vote_average * 10)}%
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-semibold truncate">
                      {movie.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {movie.release_date}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
}
