import React from 'react'
import FormInput from '../FormInput/FormInput'
import Button from '../Button/Button'
import { useState } from 'react'
import { createAuthUserWithEmail, createUserFromAuth } from '../../utils/firebase/firebase'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import '../SignIn/SignIn.scss'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const defaultField = {
        displayName: '',
        email: '',
        password: '',
        repeatPassword: ''
    }

    const [formField, setFormField] = useState(defaultField);
    const { displayName, email, password, repeatPassword } = formField;

    const { setCurrentUser } = useContext(UserContext)

    const resetFormField = () => {
        setFormField(defaultField)
    }
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(formField.password !== formField.repeatPassword) {
            alert('Password don\'t match! ');
            return;
        } 

        try {
            const { user } = await createAuthUserWithEmail(email, password);
            await createUserFromAuth(user, { displayName })
            setCurrentUser({...user, displayName: displayName})
            resetFormField()
            navigate('/shop')      
        } catch (err) {
            if(err.code === 'auth/email-already-in-use') {
                alert('Email already in use.')
            } else {
                console.log('User creation error', err.message); 
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({...formField, [name]: value})
    }

  return (
    <div className='sign-in-container'>
        <p>Sign Up using email.</p>
        <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />
            <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
            <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
            <FormInput label='Repeat password' type='password' required onChange={handleChange} name='repeatPassword' value={repeatPassword} />
            <div className="buttons">
                <Button type='submit'> Sign Up </Button>
            </div>
        </form>
    </div>
  )
}

export default SignUp