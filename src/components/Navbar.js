import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

import logo from "../assets/movienow_logo.png";

const Navbar = ({ path, setPath }) => {

    return (
        <AppBar position="static" sx={{ background: "#000" }}>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <img src={logo} alt="logo" height={45} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key="Home"
                            onClick={() => setPath("/")}
                            sx={{ m: 2, color: 'white', fontWeight: path === "/" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                        >
                            Home
                        </Button>
                        <Button
                            key="Movies"
                            onClick={() => setPath("/movies")}
                            sx={{ m: 2, color: 'white', fontWeight: path === "/movies" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                        >
                            Movies
                        </Button>
                        <Button
                            key="TV Shows"
                            onClick={() => setPath("/tvshows")}
                            sx={{ m: 2, color: 'white', fontWeight: path === "/tvshows" ? 'bold' : '', display: 'block', '&:hover': { color: 'gray' } }}
                        >
                            TV Shows
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar