import React from 'react'
import CardContainer from '../../components/CardContainer/CardContainer'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities} from '../../redux/actions/actions';
import Filter from '../../components/Filters/Filter';
import style from './Home.module.css'
import Paginate from "../../components/Paged/Page";
import video from '../../media/Home.mp4';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'




export default function Home() {

  const dispatch = useDispatch();  
  const { countryDisplayed, error } = useSelector((state) => state);
  let cantPages = Math.floor(countryDisplayed.length / 10);

  useEffect(() => {
    dispatch(getCountries());    
    dispatch(getActivities());
  }, [dispatch]);

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
