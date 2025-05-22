import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
    return (
        <div>
            filter shown with  <input value={props.filter} onChange={props.handleFilterChange} />
        </div>
    )
}

const Persons = (props) => {
    return (
       <div>
            {props.persons.filter((p) => p.name.toLowerCase().includes(props.filter.toLowerCase())).map(person => 
                <div key={person.name}> 
                    <p>{person.name} {person.number} </p>  
                </div>
            )}
      </div>
    )
}

const PersonForm = (props) => {
    return (
        <form>
        <div>
            <h3>add a new</h3>
        </div>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick = {props.handleSubmit}>add</button>
        </div>
      </form>
    )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
        .then(response => {
            setPersons(response.data)
      })
  }, [])

  const handleSubmit = (e) => {
      e.preventDefault();
      if (persons.filter((p) => p.name === newName).length>0 ) {
          alert(`${newName} is already added to phonebook`)
      } else {
          setPersons(persons.concat({name :newName, number:newNumber}))
          console.log(persons)
      }
  }

  const handleNameChange = (e) => {
      setNewName(e.target.value)
      console.log(e.target.value)
  }

  const handleNumberChange = (e) => {
      setNewNumber(e.target.value)
      console.log(e.target.value)
  }

  const handleFilterChange = (e) => {
      setFilter(e.target.value)
      console.log(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}

export default App