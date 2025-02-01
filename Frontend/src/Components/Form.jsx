import { useContext, useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
// import { useGeolocation } from "../Hooks/UseGeolocation";
import { UseUrlLocation } from "../Hooks/UseUrlLocation";
import Message from "./Message";
import Spinner from "./Spinner";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { CitiesContext } from "../Contexts/CititsContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [lat, lng] = UseUrlLocation();
  const [emoji, setEmoji] = useState();
  const [error, setError] = useState();
  const { createCity, loading } = useContext(CitiesContext);
  const [formErr, setFormErr] = useState("");

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setError("");
          setIsGeoLoading(true);

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error("Not a City. Click somewhere else 😊");
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (!lat && !lng)
    return <Message message={"Start by clicking on a city"}></Message>;

  function handleSubmit(e) {
    e.preventDefault();
    if (!notes) {
      setFormErr("Oops! Forgot your travel notes? ✍️😊");
      return;
    }
    if (!cityName || !date) return;

    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    createCity(city);
    navigate("/app/cities");
  }
  if (isGeoLoading) return <Spinner></Spinner>;

  if (error) return <Message message={error}></Message>;

  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {emoji && flagemojiToPNG(convertToEmoji(emoji))}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        {/* <Calendar
          onChange={() => {
            setDate(date);
          }}
          value={date}
          formatDay="dd" // Optional: Change format (e.g., show day as dd)
        />{" "} */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      {formErr && <div className={styles.error}>{formErr}</div>}

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
