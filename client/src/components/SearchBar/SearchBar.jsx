import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCountryByName, getCountries } from "../../redux/actions/actions";

export default function SearchBar() {
  const [countryName, setCountryName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    setCountryName(event.target.value);
  }

  function submit(event) {
    event.preventDefault();
    if (!countryName) {
      navigate("/home");
      dispatch(getCountries());
    } else {
      navigate(`/home?q=${countryName}`);
      dispatch(getCountryByName(countryName));
    }
  }

  return (
    <form onSubmit={submit}>
      <div className={style.search}>
        <input
          onChange={handleChange}
          type="search"
          name="search"
          value={countryName}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
