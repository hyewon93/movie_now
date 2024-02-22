import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router';
import { Box, Stack } from '@mui/system';
import ContentCard from './ContentCard';
import Loading from './Loading';
import { Typography } from '@mui/material';
import TabButton from './TabButton';
import Pagination from 'react-js-pagination';

const SearchFeed = () => {

    const [loading, setLoading]= useState(true);
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentTab, setCurrentTab] = useState("Movies");

    const { searchTerm } = useParams();

    useEffect(() => {

        setCurrentPage(1);

    }, [currentTab]);

    useEffect(() => {

        setLoading(true);

        let apiUrl = '';

        if(currentTab === "Movies") {
            apiUrl = `search/movie?query=${searchTerm}&page=${currentPage}`;
        } else {
            apiUrl = `search/tv?query=${searchTerm}&page=${currentPage}`;
        }

        fetchFromAPI(apiUrl)
        .then((data) => {
            setResults(data.results);
            // max_page in TMDB: 500 (total 10,000 results)
            setTotalResults(data.total_results > 10000 ? 10000 : data.total_results);
            setLoading(false);
        });

        window.scrollTo(0, 0);

    }, [currentTab, searchTerm, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                <Stack sx={{ flexDirection: "row", mt: 4, mb: 4, justifyContent: "center"}}>
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
                <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                        activePage={currentPage}
                        totalItemsCount={totalResults}
                        itemsCountPerPage={20}
                        pageRangeDisplayed={5}
                        prevPageText='<'
                        nextPageText='>'
                        onChange={handlePageChange}
                    />
                </Box>
            </Box>
            }
        </Stack>
    )
}

export default SearchFeed