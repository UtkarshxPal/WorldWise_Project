import { useContext } from "react";
import CityItem from "./CItyItem";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { CitiesContext } from "../Contexts/CititsContext";

function CountryList() {
  const { cities, loading } = useContext(CitiesContext);
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  console.log(countries);
  if (cities.length < 1)
    return (
      <Message message="Add your first city by clicking on a city on the map "></Message>
    );
  return loading ? (
    <Spinner></Spinner>
  ) : (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
