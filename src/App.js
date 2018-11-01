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
    const style = {
      backgroundColor: 'green',
      color: 'white',
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
              key={person.id}   //Key so that it tracks which specific elements has changed and needs update
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}   {/*   .map() gives us a way to map simply maps every element in a given array into something else... It does this by executing a method on every element on a given array... */}
        </div>
      );

      style.backgroundColor = 'red';
    }

    // let classes = ['red', 'bold'].join(' ');   //Very smart... the following array joins the two text into one "red bold"; now we can add to className in JSX
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');   //classes = ['red']
    }
    if (this.state.persons.lenght <= 1) {
      classes.push('bold');   //classes = ['red', 'bold']
    }
    


    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p className={classes.join(' ')}>This is really working!!</p>

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

