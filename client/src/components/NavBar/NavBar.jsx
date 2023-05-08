import React from 'react'
import style from './NavBar.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import icon  from'../../media/icon .png'

export default function NavBar() {
  return (
    <div className={style.nav}>

      <div className={style.imgcontainer} >
      <img className={style.logo} src={icon} alt="web logo"></img>
      </div>

      <div className={style.searchContainer}>
        <SearchBar></SearchBar>
      </div>

      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/create">
        <button>Create Activity</button>
      </Link>

      <Link to="/edit">
        <button>Edit Activity</button>
      </Link>
      
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/">
      <button>LogOut</button>
      </Link>

      
    </div>
  );
}
