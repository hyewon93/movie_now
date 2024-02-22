import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box, Stack, Typography } from '@mui/material';
import TabButton from './TabButton';
import ContentCard from './ContentCard';
import Loading from './Loading';
import Pagination from 'react-js-pagination';

const Tvshows = () => {

    const [loading, setLoading]= useState(true);
    const [tvshows, setTvshows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentTab, setCurrentTab] = useState("Popular");
    const [apiUrl, setApiUrl] = useState("tv/popular");

    useEffect(() => {

        setCurrentPage(1);

    }, [currentTab]);

    useEffect(() => {

        setLoading(true);

        if(currentTab === "Popular") 
            setApiUrl(`tv/popular?page=${currentPage}`);
        else if(currentTab === "Airing Today")
            setApiUrl(`tv/airing_today?page=${currentPage}`);
        else if(currentTab === "On The Air")
            setApiUrl(`tv/on_the_air?page=${currentPage}`);
        else if(currentTab === "Top Rated")
            setApiUrl(`tv/top_rated?page=${currentPage}`);

        window.scrollTo(0, 0);

    }, [currentTab, currentPage]);

    useEffect(() => {
        fetchFromAPI(apiUrl)
        .then((data) => {
            setTvshows(data.results);
            // max_page in TMDB: 500 (total 10,000 results)
            setTotalResults(data.total_results > 10000 ? 10000 : data.total_results);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    }, [apiUrl]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Stack mt={15} sx={{ flexDirection: "column", background: '#141414'}}>
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
                <Stack sx={{ flexDirection: "row", mt: 4, mb: 4, justifyContent: "center"}}>
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

export default Tvshows