import React, { Component } from "react";
import axios from "axios";

class EarthquakeItems extends Component {
  constructor() {
    super();
    this.state = {
      initialItems: [],
      items: [],
      filterValueMagType: "",
      filterValueMag: "",
      isLoading: true,
      errors: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.filterBymagType = this.filterBymagType.bind(this);
    this.filterBymag = this.filterBymag.bind(this);
  }

  getItems() {
    axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&limit=20"
      )
      .then(response => {
        this.setState({
          items: response.data.features,
          initialItems: response.data.features,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getItems();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  filterBymagType() {
    let filteredItems = this.state.items;
    filteredItems = filteredItems.filter(
      filteredItem =>
        filteredItem.properties.magType === this.state.filterValueMagType
    );
    this.setState({
      items: filteredItems
    });

    this.setState({
      items: filteredItems
    });

    if (this.state.filterValueMagType === "") {
      this.setState({
        items: this.state.initialItems
      });
    }
  };

  filterBymag() {
    let filteredItems = this.state.items;
    filteredItems = filteredItems.filter(
      filteredItem => filteredItem.properties.mag.toString() === this.state.filterValueMag
    );

    this.setState({
      items: filteredItems
    });

    if (this.state.filterValueMag === "") {
      this.setState({
        items: this.state.initialItems
      });
    }
  };

  render() {
    const { isLoading, items } = this.state;
    return (
      <>
        <input
          name="filterValueMagType"
          type="text"
          placeholder="Filter by magType"
          value={this.state.filterValueMagType}
          onChange={this.handleInputChange}
        />
        <button onClick={this.filterBymagType}>Filter</button>

        <input
          name="filterValueMag"
          type="text"
          placeholder="Filter by mag"
          value={this.state.filterValueMag}
          onChange={this.handleInputChange}
        />
        <button onClick={this.filterBymag}>Filter</button>

        <div>
          {!isLoading ? (
            items.map(item => {
              const { id } = item;
              return (
                <div key={id}>
                  <p>{id}</p>
                  <p>{item.properties.place}</p>
                  <p>{item.properties.mag}</p>
                  <p>{item.properties.magType}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </>
    );
  }
}

export default EarthquakeItems;
