import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App'

export default function PrivateRoute({ children }) {
    const [user, setUser, transaction, setTransaction] = useContext(userContext);
    return user.isSigned ? children : <Navigate to="/" />

}