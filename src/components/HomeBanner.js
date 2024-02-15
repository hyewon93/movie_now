import { Box, Button, Card, CardMedia, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import StarIcon from '@mui/icons-material/Star';

const HomeBanner = ({ item }) => {

    const [detail, setDetail] = useState();

    useEffect(() => {
        const data = fetchFromAPI(`movie/${item.id}`)
        .then((data) => setDetail(data));
    }, []);

    return (
        <Stack direction="row" justifyContent="center" p={5}>
            <Box mr={2} sx={{ width: '230px' }}>
                <Card sx={{ boxShadow: 'none', borderRadius: '7px', backgroundColor: '#000' }}>
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        sx={{ width: {xs: '100%', sm: '230px', md: '230px'}, height: '340px'}}
                    />
                </Card>
            </Box>
            <Stack direction='column' sx={{ width: '300px' }}>
                <Box sx={{ height: '80%' }}>
                    <Typography variant='h4'>{item.title}</Typography>
                    <Typography variant='subtitle2' mt={1}>
                        {detail && detail.genres.map((genre, idx) => (
                            idx === 0 ? genre.name : ' • ' + genre.name
                        ))}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {detail && detail.release_date.split('-')[0] + ' • ' + detail.runtime + ' min'}
                    </Typography>
                    <Typography variant='subtitle2' mt={1} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle' }}>
                        <StarIcon sx={{ fontSize: 15, color: '#f8cc3f', mr: '5px' }} />
                        {detail && detail.vote_average.toFixed(2)}
                    </Typography>
                    <Typography variant='body2' mt={1} sx={{ textAlign: 'justify' }}>
                        {detail && (detail.overview.length > 230 ? detail.overview.slice(0,230) + '...' : detail.overview)}
                    </Typography>
                </Box>
                <Box sx={{ height: '20%' }}>
                    <Button className="bannerButton">Detail</Button>
                </Box>
            </Stack>
        </Stack>
    )
}

export default HomeBanner