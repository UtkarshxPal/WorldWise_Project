import { createContext, useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "https://travel-management-worldwise-backend.onrender.com";
const local = "http://localhost:3000";
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
        const res = await axios.get(`${BASE_URL}/cities`, {
          withCredentials: true,
        });

        console.log(res, "response from server");
        setCities(res.data); // Assuming the cities data is returned in res.data
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity({ id }) {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/cities/${id}`, {
        withCredentials: true,
      });
      setCurrentCity(res.data); // Assuming city data is returned in res.data
    } catch (error) {
      console.log("Error getting city data", error);
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
      const res = await axios.post(`${BASE_URL}/cities`, newCity, {
        withCredentials: true,
      });
      setCities((cities) => [...cities, res.data.city]); // Assuming city is in res.data.city
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
      await axios.delete(`${BASE_URL}/cities/${id}`, { withCredentials: true });
      setCities((cities) => cities.filter((city) => city._id !== id));
    } catch (err) {
      console.log("Error deleting city", err);
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
