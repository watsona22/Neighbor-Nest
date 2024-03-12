import Header from "../components/Header";

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../styles/Login.css';


import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    ///translate useMutation to the login resolver
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });
            //call login function with the created token. token is stored in local storage
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="login-page-container">
            {/* <div className="col-12 col-lg-10"> */}
            {/* <div className="card"> */}
            <h2>Login</h2>
            {/* <div className="card-body"> */}
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                // <div className="form label textarea input">
                <form onSubmit={handleFormSubmit}>
                    <input
                        // className="form-input"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        // className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button
                        // className="btn btn-block btn-info"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                // </div>
            )}

            {error && (
                <div>
                    {error.message}
                </div>
            )}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
        </main>
    );
};

export default Login;
