import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super();
    this.state = {
      plants: [],
      searchTerm: '',
      plantsPerm: []
    }
  }

  onFilterChange = event => {
  if (event.target.value !== '') {
    this.setState({
      searchTerm: event.target.value
    });
    this.setState({
      plants: this.state.plantsPerm.filter(item => {
      return item.description.includes(event.target.value)
    })
  })
  }
  else {
    this.setState({
      plants: this.state.plantsPerm
    })
  }
}

  componentDidMount() {
    axios.get('http://localhost:3333/plants')
    .then(success => this.setState({
      plants: success.data.plantsData,
      plantsPerm: success.data.plantsData
    }))
    .catch(fail => {
      console.log(fail);
      debugger
    })
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        <input
          type="text"
          placeholder="Filter by keyword"
          onChange={this.onFilterChange}
        ></input>
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
