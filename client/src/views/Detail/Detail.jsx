import React, {useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail, clearCountry } from "../../redux/actions/actions";
import abreviation from "../../media/abreviation.png";
import continent from "../../media/continent.png";
import capital from "../../media/capital.png";
import subregion from "../../media/subregion.png";
import area from "../../media/area.png";
import name from "../../media/name.png";
import population from "../../media/population.png";
import description from "../../media/description.png";
import duration from "../../media/duration.png";
import season from "../../media/season.png";
import difficulty from "../../media/difficulty.png";

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

  return (
    <div className={`${style.container} ${style.backgroundImage}`}>
      <div className={style.container}>
        <div className={style.detailcontainer}>
          <div className={style.title}>
            <h2>Country Detail</h2>
          </div>
          <div className={style.space}></div>
          {country &&
            country.map((element) => {
              return (
                <div className={style.flagcontainer} key={element.id}>
                  <img src={element.image} alt={element.name} />
                  <h1>{element.name}</h1>
                </div>
              );
            })}
          <div className={style.informationcontainer}>
            <div className={style.countrydetailcontainer}>
              <div className={style.title}>
                <h1>Country Data</h1>
              </div>
              <div className={style.space}></div>
              {country &&
                country.map((element) => {
                  return (
                    <div className={style.activityinfo} key={element.id}>
                      <div className={style.iconContainer}>
                        <img src={abreviation} alt="abreviation" />
                        <div className={style.space}></div>
                        <h3> Abreviation : {element.id}</h3>
                      </div>
                      <div className={style.iconContainer}>
                        <img src={continent} alt="continent" />
                        <div className={style.space}></div>
                        <h3>Continent: {element.continent}</h3>
                      </div>
                      <div className={style.iconContainer}>
                        <img src={capital} alt="capital" />
                        <div className={style.space}></div>
                        <h3>Capital: {element.capital}</h3>
                      </div>
                      <div className={style.iconContainer}>
                        <img src={subregion} alt="subregion" />
                        <div className={style.space}></div>
                        <h3>Subregion: {element.subregion}</h3>
                      </div>
                      <div className={style.iconContainer}>
                        <img src={area} alt="area" />
                        <div className={style.space}></div>
                        <h3>
                          Area: {Number(element.area).toLocaleString()} km²
                        </h3>
                      </div>
                      <div className={style.iconContainer}>
                        <img src={population} alt="population" />
                        <div className={style.space}></div>
                        <h3>
                          Population:{" "}
                          {Number(element.population).toLocaleString()}
                        </h3>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={style.activitydetailcontainer}>
              <div className={style.title}>
                <h1>Activity Data</h1>
              </div>
              {country &&
                country.map((element) => {
                  return (
                    <div key={element.id}>
                      <div className={style.space}></div>
                      {element.Activities.length ? (
                        element.Activities.map((activity) => (
                          <div className={style.activityinfo} key={activity.id}>                            
                      <div className={style.iconContainer}>
                        <img src={name} alt="name" />
                        <div className={style.space}></div>
                            <h3> Name: {activity.name}</h3>
                            </div>
                      <div className={style.iconContainer}>
                        <img src={description} alt="description" />
                        <div className={style.space}></div>
                            <h3> Description: {activity.description}</h3>
                            </div>
                      <div className={style.iconContainer}>
                        <img src={duration} alt="duration" />
                        <div className={style.space}></div>
                            <h3>Duration: {activity.duration}</h3>
                            </div>
                      <div className={style.iconContainer}>
                        <img src={season} alt="season" />
                        <div className={style.space}></div>
                            <h3>Season: {activity.season}</h3>
                            </div>
                      <div className={style.iconContainer}>
                        <img src={difficulty} alt="difficulty" />
                        <div className={style.space}></div>
                            <h3>Difficulty level: {activity.dificulty}</h3>
                            </div>
                            <div className={style.activitySpace}></div>
                          </div>
                        ))
                      ) : (
                        <div className={style.activityinfo}>
                        <h3>No activities available</h3>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
