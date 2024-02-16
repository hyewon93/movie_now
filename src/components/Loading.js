import { Box, Typography } from '@mui/material';
import loading from '../assets/loading.gif';

const Loading = () => {
  return (
    <Box className="loading">
        <img src={loading} alt="loading" width="7%" mb={5} />
        <Typography variant='h6'>Loading</Typography>
    </Box>
  )
}

export default Loading