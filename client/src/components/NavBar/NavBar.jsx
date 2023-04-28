import React from 'react'
import style from './NavBar.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar({ onSearch, logout }) {
    return (
        <div className={style.nav}>
          
          <Link to="/home">
            <button >Home</button>
          </Link>
          <Link to="/create">
            <button>Create new Activity</button>
          </Link>
          <SearchBar></SearchBar>        
    
          <button onClick={logout} >LogOut</button>
        </div>
      );
}
// onClick={()=> dispatch(resetCharacters())}
//onClick={logout}
//<div><img className={style.logo} src={rick} alt="rick logo"></img></div>
// onSearch={onSearch}
//<SearchBar/>