import React from 'react'
import style from './ErrorMessage.module.css'
import image from '../../media/error.png'

export default function ErrorMessage({ errorMessage }) {
  if (errorMessage === "PageNotFound") {
    return (
      <div className={`${style.container} ${style.backgroundImage}`}>
        <div className={style.errorContainer}>
          <h1> {errorMessage}</h1>       
          <img className={style.image} src={image} alt="error img"></img>
          <h1> Please try something else! </h1>     
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={style.space} ></div>
      <div className={style.errorContainer}>
        <h1> {errorMessage}</h1>       
        <img className={style.image} src={image} alt="error img"></img>
        <h1> Please try something else! </h1>     
      </div>
      </div>
    );
  }
}
