import { useState, useEffect } from 'react'
import PersonAdder from './components/PersonAdder'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personServices from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [style, setStyle] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
      event.preventDefault()
      const samePerson = persons.find((person) => person.name == newName)
      if (samePerson) {
          if (confirm(`${newName} is already added to phonebook`)) {  
            personServices
              .changeField(samePerson.id, {number: newNumber})
              .then(response => {
                const newPerson = {
                  name: samePerson.name,
                  number: newNumber,
                  id: samePerson.id
                }
                persons.splice(persons.indexOf(samePerson),1,newPerson)
                const newPersons = [...persons]
                setPersons(newPersons)
                setStyle('blue')
                setNotificationMessage(`Changed ${newPerson.name}'s number to ${newNumber}`)
                setTimeout(() => {
                  setNotificationMessage('')
                }, 4000)
                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                setStyle('red')
                setNotificationMessage(`Information of ${newName} has already been removed from the server`)
              })

          }
      } else {
          const newPerson = {
            name: newName,
            number: newNumber,
          }
          personServices
            .create(newPerson)
            .then(response => {      
              setPersons(persons.concat(response.data))   
            })
          setStyle('green')
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => {
            setNotificationMessage('')
          }, 4000)
          setNewName('')
          setNewNumber('')
      }
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
  
  const personRemover = ({name, id}) => {
    if (confirm(`Delete ${name} ?`)) {
      personServices.remove(id)
      setPersons(persons.filter(person => person.id != id))
      setStyle('red')
      setNotificationMessage(`Removed ${name}`)
      setTimeout(() => {
        setNotificationMessage('')
      }, 4000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={style}/>
      <Filter setfilter={setFilter}/>
      <PersonAdder newname={newName} setnewname={setNewName} newnumber={newNumber} setnewnumber={setNewNumber} addPerson={addPerson}/>
      <Numbers persons={peopleToShow} personRemover = {personRemover} />
    </div>
  )
}

export default App

