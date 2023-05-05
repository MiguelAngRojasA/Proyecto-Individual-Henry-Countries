import React from 'react'
import style from './ErrorMessage.module.css'
import image from '../../media/error.png'

export default function errorMessage({errorMessage}) {
    return (
      <div className={style.errorContainer}>
        <h1> {errorMessage}</h1>       
        <img className={style.image} src={image} alt="error img"></img>
        <h1> Please try something else! </h1>     
      </div>
    )
  }
