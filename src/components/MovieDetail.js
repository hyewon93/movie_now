import { Avatar, Box, Card, CardContent, CardMedia, Chip, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';

import StarIcon from '@mui/icons-material/Star';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieDetail = () => {

    const [detail, setDetail] = useState();
    const [keywords, setKeywords] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetchFromAPI(`movie/${id}?append_to_response=videos,credits,images,reviews,recommendations`)
        .then((data) => setDetail(data));

        fetchFromAPI(`movie/${id}/keywords`)
        .then((data) => setKeywords(data.keywords));
    }, [id]);

    return (
        <Container>
            <Box className="blurBackground" sx={{ backgroundImage: `linear-gradient( rgb(0 0 0 / 90%), rgb(0 0 0 / 90%) ), url('https://image.tmdb.org/t/p/w500${detail?.backdrop_path}')` }}>
                {detail?.title}
            </Box>
            <Stack direction="column" sx={{ zIndex: 1, width: '100%', height: '100%', color: '#fff' }}>
                <Box mb={15} mt={5}>
                    <Stack direction="row">
                        <Box mr={2} sx={{ width: '360px' }}>
                            <Card sx={{ boxShadow: 'none', borderRadius: '7px', backgroundColor: '#000' }}>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500${detail?.poster_path}`}
                                    alt={detail?.title}
                                    sx={{ width: {xs: '100%', sm: '360px', md: '360px'}, height: 'auto'}}
                                />
                            </Card>
                        </Box>
                        <Box ml={2}>
                            <Stack sx={{ height: '80%' }}>
                                <Typography variant='h3'>{detail?.title}</Typography>
                                <Typography variant='subtitle1' mt={3}>
                                    {detail?.genres.map((genre, idx) => (
                                        idx === 0 ? genre.name : ' • ' + genre.name
                                    ))}
                                </Typography>
                                <Typography variant='subtitle1'>
                                    {detail?.release_date.split('-')[0] + ' • ' + detail?.runtime + ' min'}
                                </Typography>
                                <Typography variant='h6' mt={3} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle' }}>
                                    <StarIcon sx={{ fontSize: 28, color: '#f8cc3f', mr: '5px' }} />
                                    {detail?.vote_average.toFixed(2)}
                                </Typography>
                                <Typography variant='h6' mt={4} sx={{ textAlign: 'justify' }}>
                                    {detail?.overview.length > 230 ? detail?.overview.slice(0,230) + '...' : detail?.overview}
                                </Typography>
                            </Stack>
                            <Box sx={{ height: '10%' }}>
                                {keywords?.map((keyword, idx) => (
                                    <Chip key={keyword.id} variant="outlined" label={'# ' + keyword.name} sx={{ border: '1px solid #e6b400', color: '#e6b400', fontSize: '16px', mr: '20px', mt: '13px' }}></Chip>
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                </Box>
                
                <Box mb={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                        <DragIndicatorIcon sx={{ fontSize: 40, color: '#e67300', mr: '5px' }} />
                        Trailers
                    </Typography>
                    <Slider {... { dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 3 }}>
                        {detail?.videos?.results?.map((video, idx) => (
                            <Box key={'video_'+video.id} ml={2} sx={{ width: "33%"}}>
                                <iframe
                                    title="video.name"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    width="350"
                                    height="230"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen"
                                ></iframe>
                                <Typography variant='subtitle1'>{video.name}</Typography>
                            </Box>
                        ))}
                    </Slider>
                </Box>

                <Box mb={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                        <DragIndicatorIcon sx={{ fontSize: 40, color: '#e67300', mr: '5px' }} />
                        Cast
                    </Typography>
                    <Slider {... { dots: true, infinite: true, speed: 500, slidesToShow: 6, slidesToScroll: 6 }}>
                        {detail?.credits?.cast.map((cast, idx) => (
                            <Box key={'cast_'+cast.id} sx={{ justifyContent: 'center', minWidth: "150px", textAlign: 'center' }}>
                                <Box ml={4}>
                                    <Avatar alt={cast.name} src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} sx={{ width: 120, height: 120, border: '3px solid #fff' }}/>
                                </Box>
                                <Typography variant='subtitle1' fontWeight='bold' mt={1}>{cast.name}</Typography>
                                <Typography variant='subtitle1' mt={1} sx={{ color: 'gray' }}>{cast.character}</Typography>
                            </Box>
                        ))}
                    </Slider>
                </Box>

                <Box mb={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                        <DragIndicatorIcon sx={{ fontSize: 40, color: '#e67300', mr: '5px' }} />
                        Photos
                    </Typography>
                    <Slider {... { dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 3 }}>
                        {detail?.images?.backdrops?.map((image, idx) => (
                            <Box key={'image+'+image.id} ml={2} mr={2}>
                                <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt="" width="360px" />
                            </Box>
                        ))}
                    </Slider>
                </Box>

                <Box mb={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                        <DragIndicatorIcon sx={{ fontSize: 40, color: '#e67300', mr: '5px' }} />
                        Reviews
                    </Typography>
                    <Stack direction="row">
                        
                    </Stack>
                </Box>

                <Box mb={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                        <DragIndicatorIcon sx={{ fontSize: 40, color: '#e67300', mr: '5px' }} />
                        Recommendations
                    </Typography>
                    <Stack direction="row" gap={4} pl={2}>
                        {detail?.recommendations?.results?.slice(0,5).map((recommendation, idx) => (
                            <Card 
                                key={recommendation.id}
                                sx={{ width: { xs: '100%', sm: '200px', md: '200px'}, mt: 2, boxShadow: 'none', borderRadius: '7px', backgroundColor: '#000'}}
                            >
                                <Link to={`/movie/${recommendation.id}`} style={{ textDecoration: 'none' }}>
                                    <CardMedia 
                                        component="img"
                                        image={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                                        alt={recommendation.title}
                                        sx={{ width: {xs: '100%', sm: '200px', md: '200px'}, height: 'auto'}}
                                    />
                                    <CardContent sx={{ height: 'auto', textAlign: 'center' }}>
                                        <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                                            {recommendation.title}
                                        </Typography>
                                        <Typography variant="subtitle2" color="#fff" sx={{ mt: 1}}>
                                            {recommendation.release_date}
                                        </Typography>
                                        <Typography variant="subtitle2" color="#fff" justifyContent="center" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold'}}>
                                            <StarIcon sx={{ fontSize: 15, color: '#f8cc3f', mr: '5px' }} />
                                            {recommendation.vote_average.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default MovieDetail