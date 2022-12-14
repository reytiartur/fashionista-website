import React from 'react'
import { useState } from 'react'
import './SignIn.scss'
import FormInput from '../FormInput/FormInput'
import Button from '../Button/Button'
import { signInAuthUserWithEmail, signInWithGooglePopup, createUserFromAuth, getDocName } from '../../utils/firebase/firebase'

import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {

    const defaultField = {
        email: '',
        password: '',
    }

    const navigate = useNavigate()

    const [formField, setFormField] = useState(defaultField);
    const {  email, password } = formField;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormField = () => {
        setFormField(defaultField);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({...formField, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmail(email, password);
            const userDisplayName = await getDocName(user)
            setCurrentUser({...user, displayName: userDisplayName});
            resetFormField();
            navigate('/shop')
        } catch (err) {
            if(err.code === 'auth/wrong-password') {
                alert('Incorrect password!');
            } else {
                console.log('Sign In error:', err.message);
            }
            
        }
    }

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup()
        await createUserFromAuth(user)
        setCurrentUser(user)
        navigate('/shop')
    }

  return (
    <div className='sign-in-container'>
        <p>Sign In with your account...</p>
        <form onSubmit={handleSubmit}>
            <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
            <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
            <div className="buttons">
                <Button type='submit'> Sign In </Button>
                <Button type='button' buttonType='google' onClick={logGoogleUser}> Google Sign In </Button>
            </div>
        </form>  
    </div>
  )
}

export default SignIn