import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Persons/Persons';   // we can name anything... there we are following the convension -> naming it 'Person' after the 'Person.js'
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {
  state = {   //can Only be used when "Component" is extended
    persons: [
      {id: '001', name: 'Max', age: 28 },
      {id: '002', name: 'Manu', age: 29 },
      {id: '003', name: 'Stephanie', age: 34 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });


    const persons = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personindex]);

    person.name = event.target.value;

    const person = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();   // ".slice" simply copies the array and returns a new one which is then stored here... old version... use the ES6 version below...
    const persons = [...this.state.persons];   //Spread operator; more mordern ES6... YOu should always update state in an Immutable Fashion... 
    persons.splice(personIndex, 1);   //".splice" --> simply removes one element from array
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }


  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />;
    }

    return (
    <div className={classes.App}>
      <Cockpit
        appTitle={this.props.title}
        showPersons={this.state.showPersons} 
        persons={this.state.persons}
        clicked={this.togglePersonsHandler} />
      {persons}
    </div>
    )
  }
}

export default App;

