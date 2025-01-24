import { useContext } from "react";
import CityItem from "./CItyItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { CitiesContext } from "../Contexts/CititsContext";

function CityList() {
  const { cities, loading } = useContext(CitiesContext);
  if (cities.length < 1)
    return (
      <Message message="Add your first city by clicking on a city on the map "></Message>
    );
  return loading ? (
    <Spinner></Spinner>
  ) : (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city}></CityItem>
      ))}
    </ul>
  );
}

export default CityList;
