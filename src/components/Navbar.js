import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import SearchBar from './SearchBar';
import logo from "../assets/movienow_logo.png";
import { Stack } from '@mui/system';
import { useState } from 'react';

const Navbar = () => {

    const { pathname } = useLocation();

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 768 })
        return isNotMobile ? children : null
    }

    return (
        <CssBaseline>
            <AppBar sx={{ background: "#141414", postion: 'sticky', zIndex: '9999' }}>
                <Container maxWidth="x1">
                    <Mobile>
                        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <img src={logo} alt="logo" height={45} />
                            </Link>
                            <Box>
                                <Button sx={{ color: '#e67300', pr: '0' }} onClick={() => setMobileMenuOpen(isMobileMenuOpen ? false : true)}>☰</Button>
                            </Box>
                        </Toolbar>
                        <Stack direction="column" sx={{ alignItems: 'center', display: isMobileMenuOpen ? 'flex' : 'none' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button 
                                    key="Home"
                                    onClick={() => setMobileMenuOpen(false)}
                                    sx={{ m: 2, color: 'white', fontWeight: pathname === "/" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Link to="/movies" style={{ textDecoration: 'none' }}>
                                <Button 
                                    key="Movies"
                                    onClick={() => setMobileMenuOpen(false)}
                                    sx={{ m: 2, color: 'white', fontWeight: pathname === "/movies" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                                >
                                    Movies
                                </Button>
                            </Link>
                            <Link to="/tvshows" style={{ textDecoration: 'none' }}>
                                <Button 
                                    key="TV Shows"
                                    onClick={() => setMobileMenuOpen(false)}
                                    sx={{ m: 2, color: 'white', fontWeight: pathname === "/tvshows" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                                >
                                    TV Shows
                                </Button>
                            </Link>
                            <Link to="/search" style={{ textDecoration: 'none' }}>
                                <Button 
                                    key="Search"
                                    onClick={() => setMobileMenuOpen(false)}
                                    sx={{ m: 2, color: 'white', fontWeight: pathname === "/search" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                                >
                                    Search
                                </Button>
                            </Link>
                        </Stack>
                    </Mobile>
                    <Default>
                        <Toolbar disableGutters>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <img src={logo} alt="logo" height={45} />
                            </Link>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        key="Home"
                                        sx={{ m: 2, color: 'white', fontWeight: pathname === "/" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                                    >
                                        Home
                                    </Button>
                                </Link>
                                <Link to="/movies" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        key="Movies"
                                        sx={{ m: 2, color: 'white', fontWeight: pathname === "/movies" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                                    >
                                        Movies
                                    </Button>
                                </Link>
                                <Link to="/tvshows" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        key="TV Shows"
                                        sx={{ m: 2, color: 'white', fontWeight: pathname === "/tvshows" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                                    >
                                        TV Shows
                                    </Button>
                                </Link>
                            </Box>
                            <SearchBar />
                        </Toolbar>
                    </Default>
                </Container>
            </AppBar>
        </CssBaseline>
    )
}

export default Navbar