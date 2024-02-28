import { Avatar, Box, Card, CardContent, CardMedia, Chip, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';

import StarIcon from '@mui/icons-material/Star';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from './Loading';
import ContentCard from './ContentCard';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const ContentDetail = ({ type }) => {

    const [loading, setLoading]= useState(true);
    const [detail, setDetail] = useState();
    const [keywords, setKeywords] = useState([]);

    const { id } = useParams();

    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 768 })
        return isNotMobile ? children : null
    }

    useEffect(() => {

        setLoading(true);

        try{

            if(type === 'movie') {
                fetchFromAPI(`movie/${id}?append_to_response=videos,credits,images,reviews,recommendations`)
                .then((data) => {
                    setDetail(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                });

                fetchFromAPI(`movie/${id}/keywords`)
                .then((data) => setKeywords(data.keywords));

            } else {
                fetchFromAPI(`tv/${id}?append_to_response=videos,credits,images,reviews,recommendations`)
                .then((data) => {
                    setDetail(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                });
    
                fetchFromAPI(`tv/${id}/keywords`)
                .then((data) => setKeywords(data.keywords));
            }

        } catch(error) {
            console.log(error);
        }
        
    }, [id]);

    return (
        <Container>
            {loading ? <Loading /> : null}
            <Default>
                <Box className="blurBackground" sx={{ backgroundImage: `linear-gradient( rgb(0 0 0 / 90%), rgb(0 0 0 / 90%) ), url('https://image.tmdb.org/t/p/w500${detail?.backdrop_path}')` }}></Box>
                <Stack mt={15} direction="column" sx={{ zIndex: 1, width: '100%', height: '100%', color: '#fff' }}>
                    <Box mb={15} mt={5}>
                        <Stack direction="row">
                            <Box mr={2} sx={{ width: '360px' }}>
                                <Card sx={{ boxShadow: 'none', borderRadius: '7px', backgroundColor: '#141414' }}>
                                    <CardMedia
                                        component="img"
                                        image={`https://image.tmdb.org/t/p/w500${detail?.poster_path}`}
                                        alt={type === 'movie' ? detail?.title : detail?.name}
                                        sx={{ width: {xs: '100%', sm: '360px', md: '360px'}, height: 'auto'}}
                                    />
                                </Card>
                            </Box>
                            <Box ml={2}>
                                <Stack>
                                    <Typography variant='h3'>{type === 'movie' ? detail?.title : detail?.name}</Typography>
                                    <Typography variant='subtitle1' mt={3}>
                                        {detail?.genres.map((genre, idx) => (
                                            idx === 0 ? genre.name : ' • ' + genre.name
                                        ))}
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        {
                                            type === 'movie'
                                            ? detail?.release_date.split('-')[0] + ' • ' + detail?.runtime + ' min'
                                            : detail?.first_air_date + ' • ' + 'Total ' + detail?.number_of_seasons + ' Seasons ' + detail?.number_of_episodes + ' Episodes'
                                        }
                                    </Typography>
                                    <Typography variant='h6' mt={3} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle' }}>
                                        <StarIcon sx={{ fontSize: 28, color: '#f8cc3f', mr: '5px' }} />
                                        {detail?.vote_average.toFixed(2)}
                                    </Typography>
                                    <Typography variant='body1' mt={4} sx={{ textAlign: 'justify' }}>
                                        {detail?.overview}
                                    </Typography>
                                </Stack>
                                <Box mt={5} mb={3}>
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
                        <Box pl='20px' pr='20px'>
                        {
                            detail?.videos?.results?.length > 3 
                            ?
                            <Slider {... { dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 3, m: '20px' }}>
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
                                        <Typography variant='subtitle1' pl={1} pr={1}>{video.name}</Typography>
                                    </Box>
                                ))}
                            </Slider>
                            :
                            <Stack direction="row">
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
                            </Stack>
                        }
                        </Box>
                    </Box>

                    <Box mb={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                        <Typography variant='h4' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                            <DragIndicatorIcon sx={{ fontSize: 40, color: '#e67300', mr: '5px' }} />
                            Cast
                        </Typography>
                        {
                            detail?.credits?.cast.length > 3 
                            ?
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
                            :
                            <Stack direction="row">
                                {detail?.credits?.cast.map((cast, idx) => (
                                    <Stack direction="column" key={'cast_'+cast.id} sx={{ justifyContent: 'center', width: "150px", textAlign: 'center'}}>
                                        <Box ml={4} sx={{ height: 120 }}>
                                            <Avatar alt={cast.name} src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} sx={{ width: 120, height: 120, border: '3px solid #fff' }}/>
                                        </Box>
                                        <Box ml={4} sx ={{ height: 150}}>
                                            <Typography variant='subtitle1' fontWeight='bold' mt={1}>{cast.name}</Typography>
                                            <Typography variant='subtitle1' mt={1} sx={{ color: 'gray' }}>{cast.character}</Typography>
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        }
                        
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
                            Reviews ({detail?.reviews?.total_results})
                        </Typography>
                        {detail?.reviews?.results?.slice(0,5).map((review) => (
                                <Stack key={'review_' + review.id} direction="row" mt={5}>
                                    <Box ml={2}>
                                        <Avatar alt={review.author} src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`} sx={{ width: 80, height: 80 }}/>
                                    </Box>
                                    <Box ml={4} mr={4} sx={{ textAlign: "justify"  }}>
                                        <Typography variant='subtitle2' sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                            {review.author} | {review.created_at.slice(0,10)} | <StarIcon sx={{ fontSize: 15, color: '#f8cc3f', ml: '3px' }} />{review.author_details.rating ? review.author_details.rating.toFixed(1) : '-'}
                                        </Typography>
                                        <Box mt={1} p={2} sx={{ border: "2px solid #fff"}}>
                                            {review.content}
                                        </Box>
                                    </Box>
                                </Stack>
                        ))}
                    </Box>

                    {
                        detail?.recommendations?.results.length > 0 
                        ?
                        <Box mb={15} pt={3} sx={{ borderTop: '1px solid gray' }}>
                            <Typography variant='h4' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                                <DragIndicatorIcon sx={{ fontSize: 40, color: '#e67300', mr: '5px' }} />
                                Recommendations
                            </Typography>
                            <Stack direction="row" gap={2}>
                                {detail?.recommendations?.results?.slice(0,5).map((recommendation, idx) => (
                                    <ContentCard key={"recommendation_" + recommendation.id} type={recommendation.media_type} item={recommendation} isMix={false} />
                                ))}
                            </Stack>
                        </Box>
                        :
                        <Box />
                    }
                </Stack>
            </Default>
            <Mobile>
                <Box className="blurBackground" sx={{ backgroundImage: `linear-gradient( rgb(0 0 0 / 90%), rgb(0 0 0 / 90%) ), url('https://image.tmdb.org/t/p/w500${detail?.poster_path}')` }}></Box>
                <Stack direction="column" sx={{ zIndex: 1, width: '100%', height: '100%', color: '#fff' }}>
                    <Box mb={2} ml={1}>
                        <Typography variant="h5" color="#fff" sx={{ mt: '5rem', textShadow: 'rgba(255, 255, 255, 0.6) 0px 5px 10px' }}>
                            {type === 'movie' ? detail?.title : detail?.name}
                        </Typography>
                        
                        <Stack direction="row" sx={{ mt: '2rem' }}>
                            {detail?.poster_path
                            ?
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${detail?.poster_path}`} 
                                alt={type === 'movie' ? detail?.title : detail?.name }
                                style={{width: '100px', height: '150px', borderRadius: '7px'}}
                            />
                            :
                            <Box sx={{ height: '100px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                                <LocalMoviesIcon sx={{ width: '50px', height: '50px', color: 'gray' }}/>
                            </Box>
                            }
                            <Box ml={1} mr={1}>
                                <Typography variant='subtitle2' color="#fff" mt={1}>
                                    {detail?.genres.map((genre, idx) => (
                                        idx === 0 ? genre.name : ' • ' + genre.name
                                    ))}
                                </Typography>
                                <Typography variant='subtitle2' color="#fff" mt={1}>
                                    {
                                        type === 'movie'
                                        ? detail?.release_date.split('-')[0] + ' • ' + detail?.runtime + ' min'
                                        : detail?.first_air_date + ' • ' + 'Total ' + detail?.number_of_seasons + ' Seasons ' + detail?.number_of_episodes + ' Episodes'
                                    }
                                </Typography>
                                <Typography variant='subtitle2' color="#fff" mt={2} sx={{ fontWeight: 'bold', display: 'flex', verticalAlign: 'middle' }}>
                                    <StarIcon sx={{ fontSize: 20, color: '#f8cc3f', mr: '5px' }} />
                                    {detail?.vote_average.toFixed(2)}
                                </Typography>
                            </Box>
                        </Stack>
                        <Typography variant='body2' mt={2} sx={{ textAlign: 'justify' }}>
                            {detail?.overview}
                        </Typography>
                        <Box mt={5} mb={3}>
                            {keywords?.map((keyword, idx) => (
                                <Chip key={keyword.id} variant="outlined" label={'# ' + keyword.name} sx={{ border: '1px solid #e6b400', color: '#e6b400', fontSize: '10px', mr: '20px', mt: 1 }}></Chip>
                            ))}
                        </Box>
                    </Box>

                    <Box mb={5} pt={3} sx={{ borderTop: '1px solid gray' }}>
                        <Typography variant='subtitle1' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                            <DragIndicatorIcon sx={{ fontSize: 23, color: '#e67300', mr: '5px', mt: '2px' }} />
                            Trailers
                        </Typography>
                        {
                            detail?.videos?.results?.length > 3 
                            ?
                            <Slider {... { dots: false, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1 }}>
                                {detail?.videos?.results?.map((video, idx) => (
                                    <Box key={'video_'+video.id} ml={2}>
                                        <iframe
                                            title="video.name"
                                            src={`https://www.youtube.com/embed/${video.key}`}
                                            width="300"
                                            height="200"
                                            frameBorder="0"
                                            allow="autoplay; fullscreen"
                                        ></iframe>
                                        <Typography variant='subtitle1' pl={1} pr={1}>{video.name}</Typography>
                                    </Box>
                                ))}
                            </Slider>
                            :
                            <Stack direction="row">
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
                            </Stack>
                        }
                    </Box>

                    <Box mb={5} pt={3} sx={{ borderTop: '1px solid gray' }}>
                        <Typography variant='subtitle1' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                            <DragIndicatorIcon sx={{ fontSize: 23, color: '#e67300', mr: '5px', mt: '2px' }} />
                            Cast
                        </Typography>
                    </Box>

                    <Box mb={5} pt={3} sx={{ borderTop: '1px solid gray' }}>
                        <Typography variant='subtitle1' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                            <DragIndicatorIcon sx={{ fontSize: 23, color: '#e67300', mr: '5px', mt: '2px' }} />
                            Photos
                        </Typography>
                    </Box>

                    <Box mb={5} pt={3} sx={{ borderTop: '1px solid gray' }}>
                        <Typography variant='subtitle1' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                            <DragIndicatorIcon sx={{ fontSize: 23, color: '#e67300', mr: '5px', mt: '2px' }} />
                            Reviews
                        </Typography>
                    </Box>

                    <Box mb={5} pt={3} sx={{ borderTop: '1px solid gray' }}>
                        <Typography variant='subtitle1' mb={2} sx={{ display: 'flex', verticalAlign: 'middle' }}>
                            <DragIndicatorIcon sx={{ fontSize: 23, color: '#e67300', mr: '5px', mt: '2px' }} />
                            Recommendations
                        </Typography>
                    </Box>
                </Stack>
            </Mobile>
            
        </Container>
    )
}

export default ContentDetail