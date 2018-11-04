import React from 'react';
import Person from './Person/Person'

const persons = (props) => 
    props.persons.map((person, index) => {
        return <Person
          click={() => props.clicked(index)}
          name={person.name} 
          age={person.age} 
          key={person.id}   //Key so that it tracks which specific elements has changed and needs update
          changed={(event) => props.changed(event, person.id)} />
      });

export default persons;


