"use client"
import { useDispatch } from 'react-redux'
import auth, { setAuthenticated } from './slices/auth'


interface AuthObserverProps {
    authenticated: boolean
}


const AuthObserver = ({ authenticated }: AuthObserverProps) => {
    const dispatch = useDispatch()
    dispatch(setAuthenticated(authenticated))
    return null
}



export default AuthObserver;
