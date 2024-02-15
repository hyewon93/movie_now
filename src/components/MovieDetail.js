import { Box, Card, CardMedia, Chip, Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const MovieDetail = () => {

    const [detail, setDetail] = useState();
    const [keywords, setKeywords] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const detail_data = fetchFromAPI(`movie/${id}`)
        .then((data) => setDetail(data));

        const keyword_data = fetchFromAPI(`movie/${id}/keywords`)
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
            </Stack>
        </Container>
    )
}

export default MovieDetail