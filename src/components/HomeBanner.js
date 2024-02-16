import { Box, Button, Card, CardMedia, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

const HomeBanner = ({ item }) => {

    const [detail, setDetail] = useState();

    useEffect(() => {
        fetchFromAPI(`movie/${item.id}`)
        .then((data) => setDetail(data));
    }, []);

    return (
        <Stack direction="row" justifyContent="center" p={5}>
            <Box mr={2} sx={{ width: '230px' }}>
                <Card sx={{ boxShadow: 'none', borderRadius: '7px', backgroundColor: '#141414' }}>
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        sx={{ width: {xs: '100%', sm: '230px', md: '230px'}, height: '340px'}}
                    />
                </Card>
            </Box>
            <Stack direction='column' ml={3} sx={{ width: '500px' }}>
                <Box sx={{ height: '85%' }}>
                    <Typography variant='h3'>{item.title}</Typography>
                    <Typography variant='subtitle1' mt={1}>
                        {detail && detail.genres.map((genre, idx) => (
                            idx === 0 ? genre.name : ' • ' + genre.name
                        ))}
                    </Typography>
                    <Typography variant='subtitle1'>
                        {detail && detail.release_date.split('-')[0] + ' • ' + detail.runtime + ' min'}
                    </Typography>
                    <Typography variant='subtitle1' mt={2} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle' }}>
                        <StarIcon sx={{ fontSize: 25, color: '#f8cc3f', mr: '5px' }} />
                        {detail && detail.vote_average.toFixed(2)}
                    </Typography>
                    <Typography variant='body1' mt={2} sx={{ textAlign: 'justify' }}>
                        {detail && (detail.overview.length > 193 ? detail.overview.slice(0,193) + '...' : detail.overview)}
                    </Typography>
                </Box>
                <Box sx={{ height: '15%' }}>
                    <Link to={`/movie/${item.id}`}>
                        <Button className="bannerButton">Detail</Button>
                    </Link>
                </Box>
            </Stack>
        </Stack>
    )
}

export default HomeBanner