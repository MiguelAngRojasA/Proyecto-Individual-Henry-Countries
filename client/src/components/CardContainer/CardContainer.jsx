import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { useSelector } from "react-redux";

export default function CardContainer() {
 
  const { countryDisplayed } = useSelector((state) => state);
  const { numPage } = useSelector((state) => state);
  let from = (numPage - 1) * 10; // 5
  let to = numPage * 10;

  
  let viewCards = countryDisplayed?.slice(from, to);

  return (
    <div>
      {viewCards && viewCards.length > 0 ? (
        <div className={style.cards_container}>
          {viewCards.map((element) => {
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
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  )
}
