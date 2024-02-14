import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box, Button, Stack, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import TabButton from './TabButton';

const Movies = () => {

    const [movies, setMovies] = useState([]);
    const [currentTab, setCurrentTab] = useState("Popular");

    useEffect(() => {
        const data = fetchFromAPI(`movie/now_playing`)
        .then((data) => setMovies(data.results));
    }, []);

    return (
        <Stack sx={{ flexDirection: "column", background: '#000', height: { sx: 'auto', md: '92vh'}}}>
            <Box sx={{ mt: 4, mb: 2, textAlign: "center"}}>
                <Typography variant="h3" sx={{ mt: 1.5, color: '#fff' }}>
                    {currentTab} Movies
                </Typography>
            </Box>
            <Stack sx={{ flexDirection: "row", mt: 4, justifyContent: "center"}}>
                <TabButton tabName="Popular" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tabName="Now Playing" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tabName="Upcoming" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tabName="Top Rated" currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </Stack>
        </Stack>
    )
}

export default Movies