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

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '94f9f682e13cc451f5bbcd364ad07000',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results)
        })


        setTimeout(() => {
            setIsLoading(false);
        }, 3000);

    }

    if (isLoading) {
        return (
            <Loading />
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