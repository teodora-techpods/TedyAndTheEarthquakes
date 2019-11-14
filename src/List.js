import React from "react";
import axios from "axios";

export const dataReducer = (state, action) => {
  if (action.type === "SET_ERROR") {
    return { ...state, list: [], error: true };
  }
  if (action.type === "SET_LIST") {
    return { ...state, list: action.list, error: null };
  }
  if (action.type === "SET_LIST_FILTERED") {
    return { ...state, list: action.list, error: null };
  }
  throw new Error();
};

const initialData = {
  list: [],
  error: null
};

const List = () => {
  const [filter, setFilter] = React.useState();
  const [data, dispatch] = React.useReducer(dataReducer, initialData);

  React.useEffect(() => {
    axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&limit=20"
      )
      .then(response => {
        dispatch({ type: "SET_LIST", list: response.data.features });
      })
      .catch(() => {
        dispatch({ type: "SET_ERROR" });
      });
  }, []);

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFilter(value);
  };

  const filterItemsAction = () => {
    let filteredItems = [...data.list];

    filteredItems = filteredItems.filter(
      filteredItem => filteredItem.properties.magType === filter
    );

    dispatch({ type: "SET_LIST_FILTERED", list: filteredItems });
  };

  return (
    <div>
      <h1>Filters</h1>
      <Filter filter={filter} />
      <input
        name="filterValueMagType"
        type="text"
        placeholder="Filter by magType"
        value={filter}
        onChange={handleInputChange}
      />
      <button onClick={filterItemsAction}>Filter</button>

      <hr />
      <h2>My Async Data</h2>
      {data.error && <div className="error">Error</div>}
      <div>
        {data.list.map(item => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.properties.place}</p>
            <p>{item.properties.mag}</p>
            <p>{item.properties.magType}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Filter = ({ filter }) => (
  <div>
    <p>{filter}</p>
  </div>
);

export default List;
