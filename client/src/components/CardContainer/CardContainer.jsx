import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { useSelector } from "react-redux";


export default function CardContainer() {
  
  //const { numPage } = useSelector((state) => state);
  

  const {countryDisplayed} = useSelector((state) => state);

  return (    
    (
      <div>
        <div className={style.cards_container}>
          {countryDisplayed &&
            countryDisplayed.map((element) => {
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