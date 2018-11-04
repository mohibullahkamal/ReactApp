import React, { Component } from 'react';
import classes from './App.css';
// import Radium from 'radium';   //using css modules therefore getting rid of radium..
import Person from '../components/Persons/Person/Person';   // we can name anything... there we are following the convension -> naming it 'Person' after the 'Person.js'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


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
    let btnClass = null;

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

      btnClass = classes.Red;
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'pink',
      //   color: 'black'
      // }   //remove hovering code because we are removing "radium" library
    }

    // let classes = ['red', 'bold'].join(' ');   //Very smart... the following array joins the two text into one "red bold"; now we can add to className in JSX
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);   //classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);   //classes = ['red', 'bold']
    }
    


    return (
      <div className={classes.App}>
        <h1>Hi, I am a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!!</p>

        {/* onClick is JSX syntax... */}
        <button
          className= {btnClass}
          // style={style}   //removing it because we no longer using inline props
          onClick = {this.togglePersonsHandler}> Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now??'));   //This is the JS version of the above JSX
  }
}
export default App;

