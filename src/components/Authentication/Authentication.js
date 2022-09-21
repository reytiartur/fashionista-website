import axios from 'axios'
import React from 'react'
import { signInWithGooglePopup, createUserFromAuth } from '../../utils/firebase/firebase'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import './Authentication.scss'

const Authentication = () => {

    const { setCurrentUser } = useContext(UserContext)

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup()
        await createUserFromAuth(user)
        setCurrentUser(user)
    }

    return (
        <div className='auth'>
            <SignIn logGoogleUser={logGoogleUser} />
            <SignUp />
        </div>
    )
}

export default Authentication