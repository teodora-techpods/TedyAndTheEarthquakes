import React from "react";
import EarthquakeItems from "./EarthquakeItems";
import List from "./List";

const Earthquakes = () => {
  return (
    <>
      <h2>Earthquakes</h2>
      <EarthquakeItems />

      <h2>List</h2>
      <List />
    </>
  );
};
export default Earthquakes;
