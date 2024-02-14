import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const ContentCard = ({ item }) => {
  return (
    <Card sx={{ width: { xs: '100%', sm: '230px', md: '230px'}, mt: 2, boxShadow: 'none', borderRadius: '7px'}}>
      <Link to={`movie/${item.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia 
          component="img"
          image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title}
          sx={{ width: {xs: '100%', sm: '230px', md: '230px'}, height: '340px'}}
        />
        <CardContent sx={{ backgroundColor: '#000', height: 'auto', textAlign: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {item.title}
          </Typography>
          <Typography variant="subtitle2" color="#fff" sx={{ mt: 1}}>
            {item.release_date}
          </Typography>
          <Typography variant="subtitle2" color="#fff" justifyContent="center" sx={{ display: 'flex', alignItems: 'center'}}>
            <StarIcon sx={{ fontSize: 15, color: '#f8cc3f', mr: '5px' }} />
            {item.vote_average.toFixed(2)}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}

export default ContentCard