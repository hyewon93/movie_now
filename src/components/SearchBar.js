import { Search } from '@mui/icons-material';
import { IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 768 })
        return isNotMobile ? children : null
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(searchTerm) {
            navigate(`/search/${searchTerm}`);

            setSearchTerm('');
        }
    }

    const handleKeyUp = (e) => {

        console.log(e.keyCode);
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    }

    return (
        <>
            <Default>
                <Paper
                    component="form"
                    onSubmit={handleSubmit}
                    sx= {{
                        borderRadius: 20,
                        boxShadow: 'none',
                        color: '#fff',
                        backgroundColor: '#000',
                        border: '2px solid #e67300',
                        mt: '15px',
                        mb: '15px',
                        width: '500px'
                    }}
                >
                    <input 
                        className="searchInput" 
                        placeholder='Search' 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={(e) => handleKeyUp(e)}
                    />
                    <IconButton className="searchButton" type="submit" sx={{ p: '10px', color: '#e67300' }}>
                        <Search />
                    </IconButton>
                </Paper>
            </Default>
            <Mobile>
                <Typography variant='subtitle1' color='#fff' mb={4}>
                    Search Movie/TV show
                </Typography>
                <Paper
                    component="form"
                    onSubmit={handleSubmit}
                    sx= {{
                        borderRadius: 20,
                        boxShadow: 'none',
                        color: '#fff',
                        backgroundColor: '#000',
                        border: '2px solid #e67300',
                        mt: '15px',
                        mb: '15px',
                        width: '300px !important'
                    }}
                >
                    <input 
                        className="searchInput" 
                        placeholder='Search' 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={(e) => handleKeyUp(e)}
                    />
                    <IconButton className="searchButton" type="submit" sx={{ p: '10px', color: '#e67300' }}>
                        <Search />
                    </IconButton>
                </Paper>
            </Mobile>
        </>
    )
}

export default SearchBar