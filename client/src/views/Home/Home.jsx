import React from 'react'
import CardContainer from '../../components/CardContainer/CardContainer'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from '../../redux/actions/actions';


export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);


  return (
    <div>
    <h1>Esta es la vista de home </h1>
    <CardContainer></CardContainer>
    </div>
    
  )
}
