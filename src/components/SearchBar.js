import { Search } from '@mui/icons-material';
import { IconButton, Paper, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(searchTerm) {
            navigate(`/search/${searchTerm}`);

            setSearchTerm('');
        }
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    }

    return (
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
    )
}

export default SearchBar