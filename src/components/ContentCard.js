import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useMediaQuery } from 'react-responsive';

const ContentCard = ({ key, type, item, isMix }) => {

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }

  return (
    <>
    <Default>
      <Card className="contentCard" key={key} sx={{ mt: 2, boxShadow: 'none', borderRadius: '7px', backgroundColor: '#141414', width: '226px' }}>
        <Link to={type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`} style={{ textDecoration: 'none' }}>
          {item.poster_path
            ?
            <CardMedia 
              component="img"
              image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              sx={{ height: '340px', borderRadius: '7px'}}
            />
            :
            <Box sx={{ height: '340px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
              {type === 'movie' ? <LocalMoviesIcon sx={{ width: '100px', height: '100px', color: 'gray' }}/> : <LiveTvIcon sx={{ width: '100px', height: '100px', color: 'gray' }}/> }
            </Box>
          }
          
          <CardContent sx={{ height: 'auto', textAlign: 'center' }}>
            <Typography variant="subtitle1" color="#fff">
              {type === "movie" ? item.title : item.name}
            </Typography>
            {!isMix ?
              <Typography variant="subtitle2" color="#fff" sx={{ mt: 1}}>
                {type === "movie" ? item.release_date : ""}
              </Typography>
              : null
            }
            
            <Typography mt={1} variant="subtitle2" color="#fff" justifyContent="center" sx={{ display: 'flex', alignItems: 'center'}}>
              {isMix ? (type === 'movie' ? 'Movie' : 'TV') : ''}
              <StarIcon sx={{ fontSize: 15, color: '#f8cc3f', mr: '5px', ml: '5px' }} />
              {item.vote_average.toFixed(2)}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Default>
    <Mobile>
      <Card className="contentCard" key={key} sx={{ mt: 2, boxShadow: 'none', borderRadius: '7px', backgroundColor: '#141414', width: '140px' }}>
        <Link to={type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`} style={{ textDecoration: 'none' }}>
          {item.poster_path
            ?
            <CardMedia 
              component="img"
              image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              sx={{ height: '220px', borderRadius: '7px'}}
            />
            :
            <Box sx={{ height: '340px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
              {type === 'movie' ? <LocalMoviesIcon sx={{ width: '100px', height: '100px', color: 'gray' }}/> : <LiveTvIcon sx={{ width: '100px', height: '100px', color: 'gray' }}/> }
            </Box>
          }
          
          <CardContent sx={{ height: 'auto', textAlign: 'center' }}>
            <Typography variant="subtitle1" color="#fff">
              {type === "movie" ? item.title : item.name}
            </Typography>
            {!isMix ?
              <Typography variant="subtitle2" color="#fff" sx={{ mt: 1}}>
                {type === "movie" ? item.release_date : ""}
              </Typography>
              : null
            }
            
            <Typography mt={1} variant="subtitle2" color="#fff" justifyContent="center" sx={{ display: 'flex', alignItems: 'center'}}>
              {isMix ? (type === 'movie' ? 'Movie' : 'TV') : ''}
              <StarIcon sx={{ fontSize: 15, color: '#f8cc3f', mr: '5px', ml: '5px' }} />
              {item.vote_average.toFixed(2)}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Mobile>
    </>
  )
}

export default ContentCard