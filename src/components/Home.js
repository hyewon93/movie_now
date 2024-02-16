import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Carousel from 'react-material-ui-carousel';
import HomeBanner from './HomeBanner';
import { Box, Stack, Typography } from '@mui/material';
import Loading from './Loading';
import ContentCard from './ContentCard';

const Home = () => {

  const [loading, setLoading]= useState(true);
  const [allTrending, setAllTrending] = useState([]);

  useEffect(() => {
    fetchFromAPI("trending/all/day")
    .then((data) => {
      setAllTrending(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  return (
    <Stack direction="column" sx={{ color: '#fff', backgroundColor: '#000', width: '100%', maxWidth: 'none' }}>
      {loading ? <Loading /> : null}
      <Carousel animation="fade" autoPlay={false}>
        {allTrending?.slice(0, 3).map((item, idx) => (
          <HomeBanner key={item.id} item={item}/>
        ))}
      </Carousel>
      <Box ml={15} mr={15} mt={10} pt={3} sx={{ borderTop: '1px solid gray' }}>
        <Typography className='homeGradientText' variant='h4'>Trending Now</Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
          {allTrending?.slice(0,20).map((trend, idx) => (
            <ContentCard key={'content_' + trend.id} type={trend.media_type} item={trend} isMix={true}/>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

export default Home