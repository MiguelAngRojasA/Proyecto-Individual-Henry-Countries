import React from "react";
import style from "./Paged.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage,handleNumber} from "../../redux/actions/actions"


export default function Paginate({ cantPages }) {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();

  function next() {
    dispatch(nextPage());
  }

  function prev() {
    dispatch(prevPage());
  }

  function handleClickNumber(n) {
    dispatch(handleNumber(n));
  }

  const numbers = [];

// Define el rango de números que se mostrarán en la página
const start = numPage <= 6 ? 1 : numPage - 5;
const end = start + 9 > cantPages ? cantPages : start + 9;

// Agrega los números a la lista numbers
for (let i = start; i <= end; i++) {
  numbers.push(
    <li key={i} className={numPage === i ? style.active : null} onClick={() => handleClickNumber(i)}>{i}</li>
  );
}

return (
  <div className={style.page}>
    {numPage > 1 && (
      <div>
        <button onClick={prev}>PREV</button>
      </div>
    )}

    <ul>{numbers}</ul>

    {numPage < cantPages && (
      <div>
        <button onClick={next}>NEXT</button>
      </div>
    )}
  </div>
);
    }