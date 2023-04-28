import React from 'react'
import CardContainer from '../../components/CardContainer/CardContainer'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities} from '../../redux/actions/actions';
import Filter from '../../components/Filters/Filter';


export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());    
    dispatch(getActivities());
  }, [dispatch]);


  return (
    <div>
    <h1></h1>
    <Filter></Filter>
    <CardContainer></CardContainer>
    </div>
    
  )
}
