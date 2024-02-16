import { Avatar, Box, Card, CardMedia, Chip, Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieDetail = () => {

    const [detail, setDetail] = useState();
    const [keywords, setKeywords] = useState([]);

    const { id } = useParams();

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    useEffect(() => {
        const detail_data = fetchFromAPI(`movie/${id}?append_to_response=videos,credits,images,reviews`)
        .then((data) => setDetail(data));

        const keywords_data = fetchFromAPI(`movie/${id}/keywords`)
        .then((data) => setKeywords(data.keywords));
    }, []);

    return (
        <Container>
            <Box className="blurBackground" sx={{ backgroundImage: `linear-gradient( rgb(0 0 0 / 90%), rgb(0 0 0 / 90%) ), url('https://image.tmdb.org/t/p/w500${detail && detail.backdrop_path}')` }}>
                {detail && detail.title}
            </Box>
            <Stack direction="column" sx={{ zIndex: 1, width: '100%', height: '100%', color: '#fff' }}>
                <Box mt={5}>
                    <Stack direction="row">
                        <Box mr={2} sx={{ width: '360px' }}>
                            <Card sx={{ boxShadow: 'none', borderRadius: '7px', backgroundColor: '#000' }}>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500${detail && detail.poster_path}`}
                                    alt={detail && detail.title}
                                    sx={{ width: {xs: '100%', sm: '360px', md: '360px'}, height: 'auto'}}
                                />
                            </Card>
                        </Box>
                        <Box ml={2}>
                            <Stack sx={{ height: '80%' }}>
                                <Typography variant='h3'>{detail && detail.title}</Typography>
                                <Typography variant='subtitle1' mt={3}>
                                    {detail && detail.genres.map((genre, idx) => (
                                        idx === 0 ? genre.name : ' • ' + genre.name
                                    ))}
                                </Typography>
                                <Typography variant='subtitle1'>
                                    {detail && detail.release_date.split('-')[0] + ' • ' + detail.runtime + ' min'}
                                </Typography>
                                <Typography variant='h6' mt={3} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle' }}>
                                    <StarIcon sx={{ fontSize: 28, color: '#f8cc3f', mr: '5px' }} />
                                    {detail && detail.vote_average.toFixed(2)}
                                </Typography>
                                <Typography variant='h6' mt={4} sx={{ textAlign: 'justify' }}>
                                    {detail && (detail.overview.length > 230 ? detail.overview.slice(0,230) + '...' : detail.overview)}
                                </Typography>
                            </Stack>
                            <Box sx={{ height: '10%' }}>
                                {keywords && keywords.map((keyword, idx) => (
                                    <Chip variant="outlined" label={'# ' + keyword.name} sx={{ border: '1px solid #e6b400', color: '#e6b400', fontSize: '16px', mr: '20px', mt: '13px' }}></Chip>
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                </Box>
                
                <Box mt={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2}>Trailers</Typography>
                    <Slider {... { dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 3 }}>
                        {detail && detail.videos.results.map((video, idx) => (
                            <Box ml={2} sx={{ width: "33%"}}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    width="350"
                                    height="230"
                                    frameborder="0"
                                    allow="autoplay; fullscreen"
                                ></iframe>
                                <Typography variant='subtitle1'>{video.name}</Typography>
                            </Box>
                        ))}
                    </Slider>
                </Box>

                <Box mt={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2}>Cast</Typography>
                    <Slider {... { dots: true, infinite: true, speed: 500, slidesToShow: 6, slidesToScroll: 6 }}>
                        {detail?.credits?.cast.map((cast, idx) => (
                            <Box sx={{ justifyContent: 'center', minWidth: "150px", textAlign: 'center' }}>
                                <Box ml={4}>
                                    <Avatar alt={cast.name} src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} sx={{ width: 120, height: 120, border: '3px solid #fff' }}/>
                                </Box>
                                <Typography variant='subtitle1' fontWeight='bold' mt={1}>{cast.name}</Typography>
                                <Typography variant='subtitle1' mt={1} sx={{ color: 'gray' }}>{cast.character}</Typography>
                            </Box>
                        ))}
                    </Slider>
                </Box>

                <Box mt={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                    <Typography variant='h4' mb={2}>Photos</Typography>
                    <Slider {... { dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 3 }}>
                        {detail?.images?.backdrops?.map((image, idx) => (
                            <Box ml={2} mr={2}>
                                <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt="" width="360px" />
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Stack>
        </Container>
    )
}

export default MovieDetail