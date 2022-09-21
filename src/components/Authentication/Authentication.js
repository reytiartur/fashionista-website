import axios from 'axios'
import React from 'react'
import { signInWithGooglePopup, createUserFromAuth } from '../../utils/firebase/firebase'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

import './Authentication.scss'

const Authentication = () => {
    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup()
        await createUserFromAuth(user)
    }

    return (
        <div className='auth'>
            <SignIn logGoogleUser={logGoogleUser} />
            <SignUp />
        </div>
    )
}

export default Authentication