import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: '6a6ad159a38ce24c9a33c8f88f256fa4',
		language: 'ko-KR'
	}
});

export default instance;