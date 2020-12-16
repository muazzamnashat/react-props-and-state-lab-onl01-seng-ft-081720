import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (selectedType) =>{
    this.setState({
      filters: {type:selectedType}
    })
  }

  onFindPetsClick = () =>{
    let fetchURL="";
    if(this.state.filters.type === "all") fetchURL="/api/pets"
    else fetchURL=`/api/pets?type=${this.state.filters.type}`

    fetch(fetchURL)
    .then(resp => resp.json())
    .then(resp => {
      this.setState({
      pets: resp
      })
      // console.log(resp)
    })
    
  }

  onAdoptPet = (id) =>{
    const allPets = this.state.pets
    const pet = allPets.find(pet => pet.id === id);
    console.log(pet)
    pet.isAdopted = true;
    this.setState({
      pets: allPets})
  }
 
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
