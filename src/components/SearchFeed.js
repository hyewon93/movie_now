import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router';
import { Box, Stack } from '@mui/system';
import ContentCard from './ContentCard';
import Loading from './Loading';
import { Typography } from '@mui/material';
import TabButton from './TabButton';

const SearchFeed = () => {

    const [loading, setLoading]= useState(true);
    const [results, setResults] = useState([]);
    const [currentTab, setCurrentTab] = useState("Movies");

    const { searchTerm } = useParams();

    useEffect(() => {

        let apiUrl = '';

        if(currentTab === "Movies") {
            apiUrl = `search/movie?query=${searchTerm}`;
        } else {
            apiUrl = `search/tv?query=${searchTerm}`;
        }

        fetchFromAPI(apiUrl)
        .then((data) => {
            setResults(data.results);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        });
    }, [currentTab, searchTerm]);

    return (
        <Stack mt={15} ml={15} mr={15} direction="row" flexWrap="wrap" justifyContent="center" spacing={2}>
            {
            loading 
            ? 
            <Loading /> 
            :
            <Box>
                <Box sx={{ mt: 4, mb: 2, textAlign: "center"}}>
                    <Typography variant="h3" sx={{ mt: 1.5, color: '#fff' }}>
                        Search Results
                    </Typography>
                </Box>
                <Stack sx={{ flexDirection: "row", mt: 4, justifyContent: "center"}}>
                    <TabButton tabName="Movies" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    <TabButton tabName="TV Shows" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                </Stack>
                <Stack ml={15} mr={15} direction="row" flexWrap="wrap" justifyContent="center" spacing={2}>
                    {results.map((results, idx) => (
                        <Box key={idx}>
                            <ContentCard type={currentTab === 'Movies' ? 'movie' : 'tv'} item={results} />
                        </Box>
                    ))}
                </Stack>
            </Box>
            }
        </Stack>
    )
}

export default SearchFeed