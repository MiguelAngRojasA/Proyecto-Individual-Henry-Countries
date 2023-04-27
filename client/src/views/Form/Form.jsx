import React from "react";
import { useState } from "react";
import style from "./Form.module.css";
import validation from "./Validations";

export default function Form() {
  const [ActivityData, setActivityData] = useState({
    id: "",
    name: "",
    description: "",
    dificulty: "",
    duration: "",
    season: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    description: "",
    dificulty: "",
    duration: "",
    season: "",
  });

  function handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    setActivityData({ ...ActivityData, [property]: value });
    setErrors(validation({ ...ActivityData, [property]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const aux = Object.keys(errors);
    if (aux.length === 0) {
      alert("vamos bien ");

      setActivityData({
        id: "",
        name: "",
        description: "",
        dificulty: "",
        duration: "",
        season: "",
      });
      setErrors({
        id: "",
        name: "",
        description: "",
        dificulty: "",
        duration: "",
        season: "",
      });
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <label>Name of the activity: </label>
        <input
          name="name"
          type="text"
          value={ActivityData.name}
          onChange={handleChange}
        ></input>
        <p className={style.danger}>{errors.name}</p>

        <label>Description</label>
        <input
          name="description"
          type="text"
          value={ActivityData.description}
          onChange={handleChange}
        ></input>
        <p className={style.danger}>{errors.description}</p>

        <label>Dificulty level: </label>
        <input
          name="dificulty"
          type="text"
          value={ActivityData.dificulty}
          onChange={handleChange}
        ></input>
        <p className={style.danger}>{errors.dificulty}</p>
        <label>Duration in hours</label>
        <input
          name="duration"
          type="text"
          value={ActivityData.duration}
          onChange={handleChange}
        ></input>
        <p className={style.danger}>{errors.duration}</p>
        <label>Suitable season for this activity </label>
        <input
          name="season"
          type="text"
          value={ActivityData.season}
          onChange={handleChange}
        ></input>
        <p className={style.danger}>{errors.season}</p>
        {Object.keys(errors).length === 0 ? <button>Ingresar</button> : null}
      </form>
    </div>
  );
}
