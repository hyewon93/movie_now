import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Loading from './Loading';
import ContentCard from './ContentCard';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { Button } from '@mui/base';
import { useMediaQuery } from 'react-responsive';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Home = () => {

  const [loading, setLoading]= useState(true);
  const [nowPlaying, setNowPlaying] = useState();
  const [nowPlayingKey, setNowPlayingKey] = useState();
  const [allTrending, setAllTrending] = useState([]);

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }

  useEffect(() => {

    fetchFromAPI("trending/all/day")
    .then((data) => {

      fetchFromAPI(`movie/${data.results[Math.floor(Math.random() * 10)].id}?append_to_response=videos`)
      .then((detail) => {
        setNowPlaying(detail);
        
        detail?.videos?.results?.map((video, idx) => {
          if(video.type === "Trailer") {
          setNowPlayingKey(video.key);
          }
        });
      });
    });

    fetchFromAPI("trending/all/day")
    .then((data) => {
      setAllTrending(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  return (
    <Stack direction="column" sx={{ color: '#fff', backgroundColor: '#141414', width: '100%', maxWidth: 'none' }}>
      {
        loading 
        ? 
        <Loading /> 
        : 
          <Box>
            <Default>
              <Box className="homeContainer" sx={{ top: '0' }}>
                <iframe
                  className="homeVideo"
                  title={nowPlaying?.title}
                  src={`https://www.youtube.com/embed/${nowPlayingKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${nowPlayingKey}`}
                  width={{ xs: '240', md: '640' }}
                  height="360"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                ></iframe>
                <Stack className="homeContent">
                  <Box>
                    <Typography mb={3} variant='h3' sx={{ textShadow: 'rgba(255, 255, 255, 0.6) 0px 5px 10px' }}>{nowPlaying?.title}</Typography>
                    <Typography variant='subtitle1' mt={1}>
                        {nowPlaying?.genres.map((genre, idx) => (
                            idx === 0 ? genre.name : ' • ' + genre.name
                        ))}
                    </Typography>
                    <Typography variant='subtitle1'>
                        {nowPlaying?.release_date.split('-')[0] + ' • ' + nowPlaying?.runtime + ' min'}
                    </Typography>
                    <Typography variant='subtitle1' mt={2} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle' }}>
                        <StarIcon sx={{ fontSize: 25, color: '#f8cc3f', mr: '5px' }} />
                        {nowPlaying?.vote_average.toFixed(2)}
                    </Typography>
                    <Typography variant='body1' mt={2} sx={{ textAlign: 'justify' }}>
                        {(nowPlaying?.overview.length > 193 ? nowPlaying?.overview.slice(0,193) + '...' : nowPlaying?.overview)}
                    </Typography>
                  </Box>
                  <Box mt={5}>
                    <Link  to={`/movie/${nowPlaying?.id}`}>
                      <Button className="bannerButton">Detail</Button>
                    </Link>
                  </Box>
                </Stack>
              </Box>
            </Default>
            <Mobile>
              <Card key={nowPlaying?.id} sx={{ mt: '80px', ml: '2rem', mr: '2rem', borderRadius: '7px', backgroundColor: '#141414' }}>
                <Link to={`/movie/${nowPlaying?.id}`} style={{ textDecoration: 'none' }}>
                  {nowPlaying?.poster_path
                    ?
                    <CardMedia 
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500${nowPlaying?.poster_path}`}
                      alt={nowPlaying?.title}
                      sx={{ width: '100%', height: 'auto', borderRadius: '7px'}}
                    />
                    :
                    <Box sx={{ height: '400px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                      <LocalMoviesIcon sx={{ width: '100px', height: '100px', color: 'gray' }}/>
                    </Box>
                  }
                  <CardContent sx={{ height: 'auto', textAlign: 'center' }}>
                    <Typography variant="h5" color="#fff" sx={{ textShadow: 'rgba(255, 255, 255, 0.6) 0px 5px 10px' }}>
                      {nowPlaying?.title}
                    </Typography>
                    <Typography variant='subtitle2' color="#fff" mt={1}>
                        {nowPlaying?.genres.map((genre, idx) => (
                            idx === 0 ? genre.name : ' • ' + genre.name
                        ))}
                    </Typography>
                    <Typography variant='subtitle2' color="#fff" mt={1}>
                        {nowPlaying?.release_date.split('-')[0] + ' • ' + nowPlaying?.runtime + ' min'}
                    </Typography>
                    <Typography variant='subtitle2' color="#fff" mt={2} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle', justifyContent: 'center' }}>
                        <StarIcon sx={{ fontSize: 20, color: '#f8cc3f', mr: '5px' }} />
                        {nowPlaying?.vote_average.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Mobile>
            <Box ml={{ xs: 3, md: 15 }} mr={{ xs: 3, md: 15 }} mt={10} pt={3} sx={{ borderTop: '1px solid gray' }}>
              <Default>
                <Typography className='homeGradientText' variant='h4'>Trending Now</Typography>
              </Default>
              <Mobile>
                <Typography className='homeGradientText' variant='h5'>Trending Now</Typography>
              </Mobile>
              <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
                {allTrending?.slice(0,20).map((trend, idx) => (
                  <ContentCard key={'content_' + trend.id} type={trend.media_type} item={trend} isMix={true}/>
                ))}
              </Stack>
            </Box>
          </Box>
      }
      
    </Stack>
  )
}

export default Home