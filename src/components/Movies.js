import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box, Stack, Typography } from '@mui/material';
import ContentCard from './ContentCard';
import TabButton from './TabButton';
import Loading from './Loading';
import Pagination from 'react-js-pagination';
import { useMediaQuery } from 'react-responsive';

const Movies = () => {

    const [loading, setLoading]= useState(true);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentTab, setCurrentTab] = useState("Popular");
    const [apiUrl, setApiUrl] = useState("movie/popular");

    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 768 })
        return isNotMobile ? children : null
    }

    useEffect(() => {

        setCurrentPage(1);

    }, [currentTab]);

    useEffect(() => {

        setLoading(true);

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const formattedNextDate = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`;

        if(currentTab === "Popular") 
            setApiUrl(`movie/popular?page=${currentPage}`);
        else if(currentTab === "Now Playing")
            setApiUrl(`movie/now_playing?page=${currentPage}`);
        else if(currentTab === "Upcoming")
            setApiUrl(`discover/movie?primary_release_date.gte=${formattedDate}&primary_release_date.lte=${formattedNextDate}&sort_by=primary_release_date.asc&page=${currentPage}`);
        else if(currentTab === "Top Rated")
            setApiUrl(`movie/top_rated?page=${currentPage}`);

        window.scrollTo(0, 0);

    }, [currentTab, currentPage]);

    useEffect(() => {

        fetchFromAPI(apiUrl)
        .then((data) => {
            setMovies(data.results);
            // max_page in TMDB: 500 (total 10,000 results)
            setTotalResults(data.total_results > 10000 ? 10000 : data.total_results);
            setLoading(false);
        });
    }, [apiUrl]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Stack mt={15} sx={{ flexDirection: "column", background: '#141414', }}>
            {
            loading 
            ? 
            <Loading /> 
            : 
            <Box>
                <Default>
                    <Box sx={{ mt: 4, mb: 2, textAlign: "center"}}>
                        <Typography variant="h3" sx={{ mt: 1.5, color: '#fff' }}>
                            {currentTab} Movies
                        </Typography>
                    </Box>
                    <Stack sx={{ flexDirection: "row", mt: 4, mb: 4, justifyContent: "center"}}>
                        <TabButton tabName="Popular" apiUrl="popular" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                        <TabButton tabName="Now Playing" apiUrl="now_playing" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                        <TabButton tabName="Upcoming" apiUrl="upcoming" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                        <TabButton tabName="Top Rated" apiUrl="topRated" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    </Stack>
                    <Stack ml={15} mr={15} direction="row" flexWrap="wrap" justifyContent="center" spacing={2}>
                        {movies.map((movie, idx) => (
                            <Box key={idx}>
                                <ContentCard type="movie" item={movie} />
                            </Box>
                        ))}
                    </Stack>    
                </Default>
                <Mobile>
                    <Box sx={{ mt: 4, mb: 2, textAlign: "center"}}>
                        <Typography variant="h4" sx={{ mt: 1.5, color: '#fff' }}>
                            {currentTab} Movies
                        </Typography>
                    </Box>
                    <Stack sx={{ flexDirection: "row", mt: 4, mb: 4, ml: 1, justifyContent: "center"}}>
                        <TabButton tabName="Popular" apiUrl="popular" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                        <TabButton tabName="Now Playing" apiUrl="now_playing" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                        <TabButton tabName="Upcoming" apiUrl="upcoming" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                        <TabButton tabName="Top Rated" apiUrl="topRated" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={2}>
                        {movies.map((movie, idx) => (
                            <Box key={idx}>
                                <ContentCard type="movie" item={movie} />
                            </Box>
                        ))}
                    </Stack>
                </Mobile>
                
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

export default Movies