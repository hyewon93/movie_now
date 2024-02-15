import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Carousel from 'react-material-ui-carousel';
import HomeBanner from './HomeBanner';

const Home = () => {

  const [nowMovies, setNowMovies] = useState([]);

  useEffect(() => {
    const data = fetchFromAPI("movie/now_playing")
    .then((data) => setNowMovies(data.results));
  }, []);

  return (
    <Carousel animation="fade" autoPlay={false} sx={{ color: '#fff', backgroundColor: '#000' }}>
      {nowMovies.slice(0, 3).map((item, idx) => (
        <HomeBanner key={item.id} item={item}/>
      ))}
    </Carousel>
  )
}

export default Home