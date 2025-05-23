import { useState, useEffect } from 'react'
import phone from './services/phone'

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
                <div key={person.id}> 
                    <p>{person.name} {person.number} </p>  <button id={person.id} name={person.name} onClick={props.handleDelete}>Delete</button>
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
        phone.getAll().then(phones => setPersons(phones))
  }, [])

  const handleSubmit = (e) => {
      e.preventDefault();
      if (persons.filter((p) => p.name === newName).length > 0) {
          const pid = persons.filter((p) => p.name === newName)[0].id
          if (window.confirm(`${newName} is already added to the phonebook, replace the new number with a new one?`)) {
              phone.update(pid, { name: newName, number: newNumber })
                  .then(updatedPhone => setPersons(persons.map((p) => p.name === newName ? updatedPhone : p)))
          }
      } else {
          phone.create({ name: newName, number: newNumber })
              .then(newPhone => setPersons(persons.concat(newPhone)))
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

    const handleDelete = (e) => {
        if (window.confirm(`Delete ${e.target.name} ?`))
            phone.remove(e.target.id)
                .then(removedPhone => {
                    setPersons(persons.filter(p => p.id !== removedPhone.id))
                })
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      
          <h3>Numbers</h3>
          <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App