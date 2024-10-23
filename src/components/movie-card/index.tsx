import { Movie } from '@/types/movie';
import './index.scss';
import StarRating from '../star-rating';

export interface Props {
    movie: Movie
}
export default function Moviecard(props: Props) {
    const movie = props.movie;
    return (
        <li className="movie-card">
            <div className='movie-poster'>
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-infos">
                <p className='movie-title'>{movie.title}</p>
                <StarRating 
                    rating={movie.vote_average}
                />
                <div className="hidden-content">
                    <p className="description">{movie.overview}</p>
                </div>
            </div>
        </li>
    )
}