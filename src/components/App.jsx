import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Filter } from './Filter/Filter';
import styles from './App.module.scss';

export const App = () => {
  
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('my-contacts'))
    return savedContacts?.length ? savedContacts : [
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]
  })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts))
  }, [contacts])
  

  const handleChange = (e) => setFilter(e.target.value)

  const isDuplicate = ({ name, number }) => {
    const duplicate = contacts.find(contact => {
      return (contact.name.toLowerCase() === name.toLowerCase() && contact.number.toLowerCase() === number.toLowerCase())
    });

    return Boolean(duplicate);
  }

  const onAddContact = ({ name, number }) => {
    if (isDuplicate({ name, number })) {
      return Notify.failure(`Contact with this name: ${name} and number: ${number} is already exist`);
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number
      }
      return [...prevContacts, newContact]
    })
  }

  const onDelete = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))
  }

  const getFiltered = () => {
    if (!filter) {
      return contacts
    }
    const filtered = contacts.filter(({ name, number }) => {
      return (name.toLowerCase().includes(filter.toLowerCase()) || number.includes(filter))
    })
    return filtered
  }

  const items = getFiltered()

  return (
    <div className={styles.box}>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter name='filter' onChange={handleChange} />
      <ContactsList items={items} onDelete={onDelete} />
    </div>
  );
}