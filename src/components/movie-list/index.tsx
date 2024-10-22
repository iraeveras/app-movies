'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";

export default function () {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '94f9f682e13cc451f5bbcd364ad07000',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results)
        })
    }



    return (
        <ul className="movie-list">
            {movies.map((movie) =>
                <li>

                </li>
            )}
        </ul>
    )
}