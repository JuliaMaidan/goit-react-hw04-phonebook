import { initialState } from "./initialState";
import { useState } from "react";
import PropTypes from 'prop-types';
import styles from "./ContactForm.module.scss";

export const ContactForm = ({onSubmit}) => {
    const [state, setState] = useState({ ...initialState })
    
    const handleChange = (e) => {
        // const { name, value } = e.target
        
        // setstate({
        // ...state,
        // [name]: value
        // })

        setState(prevState => {
            const { name, value } = e.target
            return { ...prevState, [name]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({...state})
        e.target.reset()
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Name</label>
            <input
                className={styles.field}
                type="text"
                name="name"
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            <label className={styles.label}>Number</label>
            <input
                className={styles.field}
                type="tel"
                name="number"
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            <button className={styles.btn} type='submit'>Add contact</button>
        </form>
    )
}
ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}