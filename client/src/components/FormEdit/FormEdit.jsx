import React from "react";
import { useState, useEffect } from "react";
import style from "./FormEdit.module.css";
import validation from "./Validations";
import { useDispatch, useSelector } from "react-redux";
import { editActivities, deleteActivity } from "../../redux/actions/actions";

export default function Form() {
  const { countries, activities } = useSelector((state) => state);
  const dispatch = useDispatch();
  const sortedCountries = countries.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedActivities = activities.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [ActivityData, setActivityData] = useState({
    id: "1",
    name: "",
    description: "",
    dificulty: "",
    duration: "",
    season: "",
    countryId: [],
  });
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    description: "",
    dificulty: "",
    duration: "",
    season: "",
    countryId: "",
  });
  const [countrySelected, setCountrySelected] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  useEffect(() => {
    setErrors(validation(ActivityData));
  }, [ActivityData]);

  function handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "name") {
      const selectedActivity = sortedActivities.find(
        (activity) => activity.id === value
      );
      if (selectedActivity) {
        const { season, ...rest } = selectedActivity; 
        setActivityData({ ...ActivityData, ...rest, season: "" });
        setSelectedActivityId(selectedActivity.id);
      }
    } else if (property === "countryId") {
      const countryIds = ActivityData.countryId;
      const index = countryIds.indexOf(value);
      if (index === -1) {
        setActivityData({
          ...ActivityData,
          countryId: [...countryIds, value],
        });
        const selectedCountry = countries.find((c) => c.id === value);
        const countryProperties = {
          id: selectedCountry.id,
          image: selectedCountry.image,
        };
        setCountrySelected([...countrySelected, countryProperties]);
      }
    } else {
      setActivityData({ ...ActivityData, [property]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const aux = Object.keys(errors);
    if (aux.length === 0) {
      dispatch(editActivities(ActivityData));

      setActivityData({
        id: "",
        name: "",
        description: "",
        dificulty: "",
        duration: "",
        season: "",
        countryId: [],
      });
      setErrors({
        id: "",
        name: "",
        description: "",
        dificulty: "",
        duration: "",
        season: "",
        country: "",
      });
      setCountrySelected([]);
      setSelectedActivityId("");
      document.getElementById("country-selector").selectedIndex = 0;
      document.getElementById("season-selector").selectedIndex = 0;
      document.getElementById("activity-selector").selectedIndex = 0;
    }
  }

  function handleDelete(id) {
    // Get the current list of selected countries
    const newCountrySelected = [...countrySelected];
    const index = newCountrySelected.findIndex((country) => country.id === id);

    if (index !== -1) {
      setActivityData((prevData) => ({
        ...prevData,
        countryId: prevData.countryId.filter((c) => c !== id),
      }));
    }

    // Actualizar el estado local
    newCountrySelected.splice(index, 1);
    setCountrySelected(newCountrySelected);
  }

  function handeActivityDelete() {
    alert("la actividad a elimnar es " + selectedActivityId);
    dispatch(deleteActivity(selectedActivityId));
  }
  return (
    <div className={`${style.container} ${style.backgroundImage}`}>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.title}>
            <h2>Edit Activity</h2>
          </div>
          <div className={style.space}> </div>
          <div className={style.divfilters}>
            <label>Select one activity: </label>
            <select
              id="activity-selector"
              name="name"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select an Activity
              </option>
              {sortedActivities.map((activitie) => (
                <option key={activitie.id} value={activitie.id}>
                  {activitie.name}
                </option>
              ))}
            </select>
            <div className={style.space}> </div>
            {selectedActivityId ? (
              <button
                className={style.buttonForm}
                onClick={() => handeActivityDelete()}
              >
                ❌Delete this Activity❌
              </button>
            ) : null}

            <div className={style.diverrormessage}>
              <p className={style.danger}>{errors.name}</p>
            </div>
          </div>
          <div className={style.space}> </div>
          <div className={style.divfilters}>
            <label>Description</label>
            <input
              name="description"
              type="text"
              value={ActivityData.description}
              onChange={handleChange}
            ></input>
            <p className={style.danger}>{errors.description}</p>
          </div>
          <div className={style.space}> </div>
          <div className={style.divfilters}>
            <label>Dificulty level: </label>
            <input
              name="dificulty"
              type="text"
              value={ActivityData.dificulty}
              onChange={handleChange}
            ></input>
            <p className={style.danger}>{errors.dificulty}</p>
          </div>
          <div className={style.space}> </div>
          <div className={style.divfilters}>
            <label>Duration in hours</label>
            <input
              name="duration"
              type="text"
              value={ActivityData.duration}
              onChange={handleChange}
            ></input>
            <p className={style.danger}>{errors.duration}</p>
          </div>
          <div className={style.space}> </div>
          <div className={style.divfilters}>
            <label>Suitable season for this activity </label>
            <select
              id="season-selector"
              name="season"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a season
              </option>
              <option key="Summer" value="Summer">
                Summer
              </option>
              <option key="Fall" value="Fall">
                Fall
              </option>
              <option key="Winter" value="Winter">
                Winter
              </option>
              <option key="Spring" value="Spring">
                Spring
              </option>
            </select>

            <p className={style.danger}>{errors.season}</p>
          </div>
          <div className={style.space}> </div>
          <div className={style.divfilters}>
            <label htmlFor="countries">
              Select a country for this activity
            </label>
            <select
              id="country-selector"
              name="countryId"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a country
              </option>
              {sortedCountries.map((countryId) => (
                <option key={countryId.id} value={countryId.id}>
                  {countryId.name}
                </option>
              ))}
            </select>
            <p className={style.danger}>{errors.countryId}</p>
          </div>
          <div className={style.space}> </div>
          <div className={style.divfilters}>
            <label>Selected Countries</label>

            <div className={style.countriesContainer}>
              {countrySelected.map((country) => (
                <div key={country.id} className={style.countryContainer}>
                  <img
                    className={style.container_image}
                    src={country.image}
                    alt={country.name}
                  />
                  <span>{country.id}</span>
                  <button
                    className={style.buttonForm}
                    onClick={() => handleDelete(country.id)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={style.space}> </div>
          {Object.keys(errors).length === 0 ? (
            <button className={style.submit}>Submit</button>
          ) : null}
        </form>
      </div>
    </div>
  );
}
