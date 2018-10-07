import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';   // we can name anything... there we are following the convension -> naming it 'Person' after the 'Person.js'

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
    this.setState({showPersons: !doesShow});
  }


  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              key={person.id} 
              changed={(event) => this.nameChangedHandler(event, person)} />
          })}   {/*   .map() gives us a way to map simply maps every element in a given array into something else... It does this by executing a method on every element on a given array... */}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p>This is really working!!</p>

        {/* onClick is JSX syntax... */}
        <button 
          style={style}
          onClick = {this.togglePersonsHandler}> Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now??'));   //This is the JS version of the above JSX
  }
}
export default App;

