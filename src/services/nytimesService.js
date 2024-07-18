import axios from 'axios';

const API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed';

export const fetchArticles = async (period = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/${period}.json?api-key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching articles');
  }
};
