import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail,clearCountry  } from "../../redux/actions/actions";
import Card from "../../components/Card/Card";

export default function Detail() {
  const { id } = useParams();  
  const {country} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(id));
    return () => {
      dispatch(clearCountry());
    };
  }, [dispatch, id]);
  
  if (!country) {
    return <div>Loading...</div>
  }

  

  return (    
    (
      <div> 
        <div className={style.cards_container}>
          {country &&
            country.map((element) => {
              return (
                <Card
                  key={element.id}
                  id={element.id}
                  image={element.image}
                  name={element.name}
                  continent={element.continent}                                  
                ></Card>               
              );
            })}
        </div>        
      </div>
    )
  );
}
