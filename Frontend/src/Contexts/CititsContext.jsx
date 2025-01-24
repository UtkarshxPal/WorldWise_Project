import { createContext, useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "https://wordwise-v1-project.onrender.com";
const CitiesContext = createContext();

function CititsContext({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [mapPosition, setMapPosition] = useState([28.6139, 77.209]);

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error loading data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity({ id }) {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch {
      alert("Error loading data");
    } finally {
      setLoading(false);
    }
  }

  // async function createCity(newCity) {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(`${BASE_URL}/cities`, {
  //       method: "POST",
  //       body: JSON.stringify(newCity),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await res.json();
  //     setCities((cities) => [...cities, data]);
  //   } catch {
  //     alert("Error loading data");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function createCity(newCity) {
    try {
      const data = await axios.post(`${BASE_URL}/cities`, newCity);
      console.log("data.data dekh lo ji", data.data.city);

      setCities((cities) => [...cities, data.data.city]);

      console.log("City added successfully:", data.data);
    } catch (error) {
      console.log(
        "Could not create new city",
        error.response?.data || error.message
      );
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/cities/${id}`);

      setCities((cities) => cities.filter((city) => city._id !== id));
    } catch (err) {
      console.log("Error deleting City", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        loading: loading,
        getCity,
        currentCity,
        mapPosition,
        setMapPosition,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CititsContext, CitiesContext };
