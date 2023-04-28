import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail, clearCountry } from "../../redux/actions/actions";
import Card from "../../components/Card/Card";

export default function Detail() {
  const { id } = useParams();
  const { country } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(id));
    return () => {
      dispatch(clearCountry());
    };
  }, [dispatch, id]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={style.cards_container}>
        {country &&
          country.map((element) => {
            return (
              <div className={style.detail} key={element.id}>
                <h1>{element.id}</h1>
                <h1>{element.name}</h1>
                <img src={element.image} alt={element.name} />
                <h1>{element.continent}</h1>
                <h1>{element.capital}</h1>
                <h1>{element.subregion}</h1>
                <h1>{element.area}</h1>
                <h1>{element.population}</h1>
                <div>
                  {element.Activities.map((activity) => (
                    <div key={activity.id}>
                      <h1>{activity.name}</h1>                    
                      <h1>{activity.duration}</h1>
                     
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
