import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useContext } from "react";
import { CitiesContext } from "../Contexts/CititsContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function CityItem({ city }) {
  const { currentCity, deleteCity } = useContext(CitiesContext);
  const { cityName, emoji, date, _id: id, position = {} } = city;

  console.log(
    "emoji dekh lo bhaiya",
    emoji,
    "flag toemjoi",
    flagemojiToPNG(emoji)
  );
  // console.log(city);
  const lat = parseFloat(position.lat || 0); // Convert to number
  const lng = parseFloat(position.lng || 0);

  function handleClick(e) {
    e.preventDefault();
    console.log(id);
    deleteCity(id);
  }
  return (
    <li>
      <Link
        key={city.id}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>
          {flagemojiToPNG(convertToEmoji(emoji))}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
