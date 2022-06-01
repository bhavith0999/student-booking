import React, { useEffect, useState } from 'react'
import './LoginScreen.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UserService from '../../Services/user.service';

const LoginScreen = () => {


    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [showPassword, setToShowPassword] = useState(false);

    const navigate = useNavigate();

    const save = async (data) => {
        console.log(data);
        try {
            const res = await UserService.login(data);
            localStorage.setItem('id', res?.data?.id)
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 400) {
                setError('username', {
                    message: 'Invalid Credentials'
                }, {
                    shouldFocus: true
                })
            }
        }
    }

    return (
        <div style={{ background: '#f8f8fb', height: '100vh' }} className='d-flex align-items-center'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card overflow-hidden">
                            <div className="bg-primary bg-soft">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="text-primary p-4">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p>Sign in to continue.</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="auth-logo">
                                    <a href="index.html" className="auth-logo-light">
                                        <div className="avatar-md profile-user-wid mb-4">
                                            
                                        </div>
                                    </a>

                                    <a href="index.html" className="auth-logo-dark">
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img src="/assets/img/auth.svg" alt="" className="rounded-circle" height="34" />
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div>

                                    <form onSubmit={handleSubmit(save)} style={{ width: '100%' }}>
                                        <div className="form-group">

                                            <label className="form-label">
                                                Username
                                            </label>
                                            <input type="text"
                                                {...register("username", {
                                                    required: 'Required Input'
                                                })}
                                                className="form-control" placeholder="Username" />
                                            {
                                                errors?.username && (
                                                    <small className='text-danger mt-3 ms-3'>{errors?.username?.message}</small>
                                                )
                                            }

                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col">
                                                    <label className="form-label">
                                                        Password
                                                    </label>

                                                </div>
                                               
                                            </div>

                                            <div className="input-group input-group-merge">

                                                <input
                                                    {...register("password", { required: 'Required Input' })}
                                                    className="form-control" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />

                                                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setToShowPassword(!showPassword)}>
                                                    {
                                                        showPassword ? (
                                                            <FaEyeSlash />
                                                        ) : (

                                                            <FaEye />
                                                        )
                                                    }
                                                </span>

                                            </div>
                                            {
                                                errors?.password && (
                                                    <small className='text-danger mt-3 ms-3'>{errors?.password?.message}</small>
                                                )
                                            }
                                        </div>

                                        <button className="btn btn-md w-100 btn-primary mb-3 mt-3" type='submit'>
                                            Sign in
                                        </button>

                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
