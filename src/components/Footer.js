import { Container, Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Stack sx={{ backgroundColor: '#141414', textAlign: 'center', }}>
        <Typography mt={15} mb={3} sx={{ color: '#fff', fontSize:'12px' }}>© 2023 HW_DEV. ALL RIGHTS RESERVED.</Typography>
    </Stack>
  )
}

export default Footer