import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import './Row.css'
import MovieModal from './MovieModal';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({title, fetchUrl, isLargeRow, id}) {
  const [movies, setMovies] = useState([]);
	const [modalOpen, setModalOpen] = useState(false)
	const [movieSelected, setMovieSelected] = useState({})


  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const {data} = await axios.get(fetchUrl);
    setMovies(data.results)
  }
  
  const handleClick = (movie) => {
		setModalOpen(true);
		setMovieSelected(movie);
		console.log(movie)
	}

	if(modalOpen){
		document.querySelector('body').style.overflow = 'hidden';
	} else {
		document.querySelector('body').style.overflow = '';
	}
	
  return (
	<section className='row'>
    <h2>{title}</h2>
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={'auto'}
      navigation
			loop={true}
    >      
      <div id={id} className='row__posters'>
        {movies.map((movie) => (
					<SwiperSlide className={`row__poster ${isLargeRow && "row__posterLarge"}`}>
						<img
							key={movie.id}
							className={`row__poster ${isLargeRow && "row__posterLarge"}`}
							src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
							alt={movie.name}
							onClick={() => handleClick(movie)}
						/>
					</SwiperSlide>
        ))}
      </div>      
    </Swiper>
		{			
			modalOpen && (
				
				<MovieModal {...movieSelected} setModalOpen={setModalOpen} />
			)
		}
  </section>
  )
}
