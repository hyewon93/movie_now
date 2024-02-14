import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box, Stack, Typography } from '@mui/material';
import ContentCard from './ContentCard';
import TabButton from './TabButton';

const Movies = () => {

    const [movies, setMovies] = useState([]);
    const [currentTab, setCurrentTab] = useState("Popular");
    const [apiUrl, setApiUrl] = useState("movie/popular");

    useEffect(() => {

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const formattedNextDate = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`;

        if(currentTab === "Popular") 
            setApiUrl("movie/popular");
        else if(currentTab === "Now Playing")
            setApiUrl("movie/now_playing");
        else if(currentTab === "Upcoming")
            setApiUrl(`discover/movie?primary_release_date.gte=${formattedDate}&primary_release_date.lte=${formattedNextDate}&sort_by=primary_release_date.asc`);
        else if(currentTab === "Top Rated")
            setApiUrl("movie/top_rated");

    }, [currentTab]);

    useEffect(() => {
        const data = fetchFromAPI(apiUrl)
        .then((data) => setMovies(data.results));
    }, [apiUrl]);

    return (
        <Stack sx={{ flexDirection: "column", background: '#000'}}>
            <Box sx={{ mt: 4, mb: 2, textAlign: "center"}}>
                <Typography variant="h3" sx={{ mt: 1.5, color: '#fff' }}>
                    {currentTab} Movies
                </Typography>
            </Box>
            <Stack sx={{ flexDirection: "row", mt: 4, justifyContent: "center"}}>
                <TabButton tabName="Popular" apiUrl="popular" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tabName="Now Playing" apiUrl="now_playing" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tabName="Upcoming" apiUrl="upcoming" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tabName="Top Rated" apiUrl="topRated" currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </Stack>
            <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2}>
                {movies.map((movie, idx) => (
                    <Box key={idx}>
                        <ContentCard type="movies" item={movie} />
                    </Box>
                ))}
            </Stack>
        </Stack>
    )
}

export default Movies