import style from "./Card.module.css";
import { Link } from "react-router-dom";
export default function Card(props) {
  const { id, name, image, continent,population} = props;
  return (
    <Link className={style.link} to={`/detail/${id}`}>
      <div className={style.card}>
        <div className={style.imageContainer}>
          <img src={image} alt={name} className={style.image} />
        </div>
        <div className={style.infoContainer}>
          <div className={style.body_card}>
            <h1>{name}</h1>
            <h2> Continent : {continent}</h2>            
          </div>
        </div>
      </div>
    </Link>
  );
}
