import React from 'react'
import style from './Landing.module.css'
import video from '../../media/landing2.mp4'
import image from '../../media/countries.png'
import { Link } from 'react-router-dom'
export default function Landing() {

  
  return (
    <div className={style.landing}>
    <video autoPlay muted loop className={style.video}>
      <source src={video} type="video/mp4" />
    </video>
    <div className={style.content}>   
      <h1>Welcome to my Country App </h1>       
      <div className={style.imageContainer}>
        <img className={style.image} src={image} alt="world map"></img>      
        <Link to="/home">
          <button>Start</button>
        </Link>
      </div>
    </div>
  </div>
  );
}
