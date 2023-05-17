import React from 'react'
import CardContainer from '../../components/CardContainer/CardContainer'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities,getCountryByName ,applyFilters } from '../../redux/actions/actions';
import { useLocation } from "react-router-dom";
import Filter from '../../components/Filters/Filter';
import style from './Home.module.css'
import Paginate from "../../components/Paged/Page";
import video from '../../media/Home.mp4';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'

export default function Home() {

  const dispatch = useDispatch();  
  const { countryDisplayed, error, filters} = useSelector((state) => state);

  const { search } = useLocation();
  const location = useLocation();
const query = new URLSearchParams(search).get("q");
  let cantPages = Math.floor(countryDisplayed.length / 10);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getCountries()),
        dispatch(getActivities()),
        dispatch(applyFilters(filters))
      ]);
        
      if (query) {
        dispatch(getCountryByName(query))
          .then(() => {
            dispatch(applyFilters(filters));
          });
      } else {
        dispatch(applyFilters(filters));
      }
    };
  
    fetchData();
  }, [dispatch, query]);



  return (
    <div className={style.landing}>
    <video autoPlay muted loop className={style.video}>
      <source src={video} type="video/mp4" />
    </video>
    <div className={style.homecontainer}>
  <div className={style.filterContainer}>
    <Filter />    
  </div>
  <div className={style.cardContainerWrapper}>
    <div className={style.cardContainer}>
      {error.countryNotFound ? (
        <ErrorMessage errorMessage={error.countryNotFound} />  
      ) : (
        <div>
          <CardContainer />
          <div>
            <Paginate cantPages={cantPages}></Paginate>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
</div>
  )
}