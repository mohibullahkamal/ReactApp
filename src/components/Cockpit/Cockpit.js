import React from 'react';

const cockpit = (props) => {

    // let classes = ['red', 'bold'].join(' ');   //Very smart... the following array joins the two text into one "red bold"; now we can add to className in JSX
    const assignedClasses = [];
    if (this.props.persons.length <= 2) {
        assignedClasses.push(classes.red);   //classes = ['red']
    }
    if (this.props.persons.length <= 1) {
        assignedClasses.push(classes.bold);   //classes = ['red', 'bold']
    }

    return (
        <div>
            <h1>Hi, I am a React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!!</p>

            <button
            className= {btnClass}
            // style={style}   //removing it because we no longer using inline props
            onClick = {this.togglePersonsHandler}>
                Toggle Persons
            </button>
        </div>
    );
};

export default cockpit;
