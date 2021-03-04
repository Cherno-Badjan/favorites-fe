import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = ({ render: Component, ...rest }) => {
    return (
        //Hide component if there is no User signed in and redirect to log in page
        <Route {...rest} render={props => (rest.token ? <Component {...props} {...rest} /> : <Redirect to="/login" />)} />
    )
}
export default PrivateRouter