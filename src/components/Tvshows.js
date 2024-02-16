import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box, Stack, Typography } from '@mui/material';
import TabButton from './TabButton';
import ContentCard from './ContentCard';
import Loading from './Loading';

const Tvshows = () => {

    const [loading, setLoading]= useState(true);
    const [tvshows, setTvshows] = useState([]);
    const [currentTab, setCurrentTab] = useState("Popular");
    const [apiUrl, setApiUrl] = useState("tv/popular");

    useEffect(() => {

        if(currentTab === "Popular") 
            setApiUrl("tv/popular");
        else if(currentTab === "Airing Today")
            setApiUrl("tv/airing_today");
        else if(currentTab === "On The Air")
            setApiUrl("tv/on_the_air");
        else if(currentTab === "Top Rated")
            setApiUrl("tv/top_rated");

    }, [currentTab]);

    useEffect(() => {
        const data = fetchFromAPI(apiUrl)
        .then((data) => {
            setTvshows(data.results);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    }, [apiUrl]);

    return (
        <Stack sx={{ flexDirection: "column", background: '#000'}}>
            {
            loading 
            ? 
            <Loading /> 
            : 
            <Box>
                <Box sx={{ mt: 4, mb: 2, textAlign: "center"}}>
                    <Typography variant="h3" sx={{ mt: 1.5, color: '#fff' }}>
                        {currentTab} TV Shows
                    </Typography>
                </Box>
                <Stack sx={{ flexDirection: "row", mt: 4, justifyContent: "center"}}>
                    <TabButton tabName="Popular" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    <TabButton tabName="Airing Today" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    <TabButton tabName="On The Air" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    <TabButton tabName="Top Rated" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                </Stack>
                <Stack ml={15} mr={15} direction="row" flexWrap="wrap" justifyContent="center" spacing={2}>
                    {tvshows.map((tvshow, idx) => (
                        <Box key={idx}>
                            <ContentCard type="tvshow" item={tvshow} />
                        </Box>
                    ))}
                </Stack>
            </Box>
            }
        </Stack>
    )
}

export default Tvshows