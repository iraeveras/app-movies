'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "../movie-card";
import { Movie } from "@/types/movie";
import Loading from "../loading";
import "./index.scss";

export default function Movielist() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
                    language: 'pt-BR'
                }
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Failed to fetch movies', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch movies');
        } finally {
            setIsLoading(false);
        }

    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return (
            <p>Ocorreu um erro ao carregar os filmes.</p>
        )
    }

    return (
        <ul className="movie-list">
            {movies.map((movie) =>
                <Moviecard
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    )
}
