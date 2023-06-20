import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

export default function DetailPage() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get(`/movie/${movieId}`);
      setMovie(data);
    }
    fetchData();
   
  }, [movieId]);
  
  if(!movie) {
    return (
      <div>...loading</div>
    )
  } else {
    return (
      <section>
        <img className='modal__poster-img' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
      </section>
    )
  }
  
}
