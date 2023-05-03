import React from 'react'
import CardContainer from '../../components/CardContainer/CardContainer'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities} from '../../redux/actions/actions';
import Filter from '../../components/Filters/Filter';
import style from './Home.module.css'
import Paginate from "../../components/Paged/Page";



export default function Home() {

  const dispatch = useDispatch();  
  const { countryDisplayed, error } = useSelector((state) => state);
  let cantPages = Math.floor(countryDisplayed.length / 10);

  useEffect(() => {
    dispatch(getCountries());    
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div>
      <h1>Título</h1>
      <Filter />
      <div>     
        {error.countryNotFound ? (
          <p>Error: {error.countryNotFound}</p>
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
  );
}
