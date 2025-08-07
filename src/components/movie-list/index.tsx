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
            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGY5ZjY4MmUxM2NjNDUxZjViYmNkMzY0YWQwNzAwMCIsIm5iZiI6MTcyOTYyNjM3NS4zMTksInN1YiI6IjY3MTgwMTA3Yzc4MDJjYzUwMzU5ODk0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._tWIFNTuHTAEnv6FOq9qifA1teo90DJ8bDnubyg4C8k'
                }
            };
            const response = await axios.request(options); // <--- Pega o objeto de resposta do axios
            console.log(response.data); // <--- Mostra o corpo da resposta
            setMovies(response.data.results); // <--- Agora sim, pega o campo correto
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