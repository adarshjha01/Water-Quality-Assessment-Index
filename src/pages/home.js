import React from "react";
import SearchBar from "../components/searchbar/Searchbar";
import DashboardMap from "../components/DashboardMap";
import Predict from "./predictt";
import Range from "./range";
import Footer from "./footer";


export const Home = ({user, setUser, setLoader}) => {
  return (
    <>
      <SearchBar user={user} setUser={setUser} setLoader={setLoader} />
      <DashboardMap />
      <Range />
      <Predict/>
      <Footer/>
    </>
  );
};
