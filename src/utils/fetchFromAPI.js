import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
    params: {
        api_key: "805661ed6665a4785f84cf538120a6b2",
    },
    headers: {
        'accept': 'application/json'
    }
};

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
}