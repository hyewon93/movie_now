import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box } from '@mui/material';
import MovieCard from './MovieCard';

const Movies = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const data = fetchFromAPI(`movie/now_playing`)
        .then((data) => setMovies(data.results));
    }, []);

    return (
        <div>
            {movies.map((movie, idx) => (
                <Box key={idx}>
                    <MovieCard movie={movie} />
                </Box>
            ))}
        </div>
    )
}

export default Movies