import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

import { login, reset } from '../features/auth/authSlice';

import AuthType from '../models/AuthType';

interface LoginForm {
    email: string;
    password: string;
}

const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.auth);

    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const userData: AuthType = {
            email,
            password,
        };

        if (email === '' || password === '') {
            toast.error('Please fill in all fields');
            return;
        }

        dispatch(login(userData));

        dispatch(reset());
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;
