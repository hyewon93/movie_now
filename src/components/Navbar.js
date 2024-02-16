import { AppBar, Box, Button, Container, CssBaseline, Toolbar } from '@mui/material';

import logo from "../assets/movienow_logo.png";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const { pathname } = useLocation();

    return (
        <CssBaseline>
            <AppBar position="static" sx={{ background: "#000" }}>
                <Container maxWidth="x1">
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
                    </Toolbar>
                </Container>
            </AppBar>
        </CssBaseline>
    )
}

export default Navbar