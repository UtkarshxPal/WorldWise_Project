import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/appLayout";
import Login from "./pages/Login";
import CityList from "./Components/CityList";
import Form from "./Components/Form";
import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import { CititsContext } from "./Contexts/CititsContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Itenary from "./pages/Itenary";

function App() {
  return (
    <AuthProvider>
      <CititsContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="product" element={<Product></Product>}></Route>
            <Route path="pricing" element={<Pricing></Pricing>}></Route>
            {/* <Route path="itenary" element={<Itenary></Itenary>}></Route> */}
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout></AppLayout>
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="cities"></Navigate>}
              ></Route>
              <Route path="cities" element={<CityList></CityList>}></Route>
              <Route path="cities/:id" element={<City></City>}></Route>
              <Route
                path="countries"
                element={<CountryList></CountryList>}
              ></Route>

              <Route path="form" element={<Form></Form>}></Route>
            </Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </CititsContext>
    </AuthProvider>
  );
}

export default App;
