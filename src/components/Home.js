import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Carousel from 'react-material-ui-carousel';
import HomeBanner from './HomeBanner';
import { Container, Stack } from '@mui/material';

const Home = () => {

  const [loading, setLoading]= useState(true);
  const [nowMovies, setNowMovies] = useState([]);

  useEffect(() => {
    const data = fetchFromAPI("movie/now_playing")
    .then((data) => setNowMovies(data.results));
  }, []);

  return (
    <Stack sx={{ color: '#fff', backgroundColor: '#000', width: '100%', maxWidth: 'none' }}>
      <Carousel animation="fade" autoPlay={false}>
        {nowMovies.slice(0, 3).map((item, idx) => (
          <HomeBanner key={item.id} item={item}/>
        ))}
      </Carousel>
    </Stack>
  )
}

export default Home