// import Radium from 'radium';   //using css modules therefore getting rid of radium..
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';   // we can name anything... there we are following the convension -> naming it 'Person' after the 'Person.js'



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

    const person = {
      ...this.state.persons[personIndex]   //This will distribute all objects into
    };
    // const person = Object.assign({}, this.state.persons[personindex]);   //old approach so not using it

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  //   this.setState( {   //takes object as an argument and it will merge whatever we define here with the above "state".. 
  //     persons: [
  //       {name: 'Max', age: 27 },
  //       {name: event.target.value, age: 29 },
  //       {name: 'Stephanie', age: 34 }
  //     ]
  //   } )
  // }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();   // ".slice" simply copies the array and returns a new one which is then stored here... old version... use the ES6 version below...
    const persons = [...this.state.persons];   //Spread operator; more mordern ES6... YOu should always update state in an Immutable Fashion... 
    persons.splice(personIndex, 1);   //".splice" --> simply removes one element from array
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});   //changes state of "showPersons"
  }


  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons = {this.state.persons}
            clicked = {this.deletePersonHandler}
            changed = {this.nameChangedHandler} />
        </div>
      );

      btnClass = classes.Red;
      
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'pink',
      //   color: 'black'
      // }   //remove hovering code because we are removing "radium" library
    }

    return (
      <div className={classes.App}>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now??'));   //This is the JS version of the above JSX
  }
}
export default App;

