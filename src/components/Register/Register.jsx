import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { regSchema } from '../schemas/register.jsx'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header.jsx'

export default function Register() {
    let [error, setError] = useState([])
    let navigate = useNavigate()
    let { errors, values, handleChange, handleSubmit, handleBlur,touched } = useFormik({
        initialValues: {
            email: "",
            userName: "",
            password: "",
            cPassword: ""
        },
        validationSchema: regSchema,
        onSubmit: register
    })
    async function register(values) {
        console.log(values);
        console.log(errors);
        let { data } = await axios.post('https://ecommerce-node-3.vercel.app/auth/signup', values)
        if (data.message === "success") {
            console.log("registred");
            navigate('/login')
        } else {
            console.log(data);
            setError(data.err[0])
        }
        console.log(data)
    }
    return (
        <>
        <Header
        title="Create an account"
        height="40"
       />
        <div className="container mt-5 pt-5">
            <div className='w-50 m-auto text-center'>
                {
                    error.map((err) => {
                        return <div className='alert alert-danger'>{err.message}</div>
                    })
                }
            </div>
            <form className='w-50 m-auto text-center  mb-5 py-5' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" id="exampleInputEmail1"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='email' aria-describedby="emailHelp"
                        className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                    />
                    {errors.email && touched.email ? <div className='small text-danger'>{errors.email}</div> : <></>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" id="exampleInputName"
                        value={values.userName}
                        onChange={handleChange}
                        name='userName'
                        onBlur={handleBlur}
                        className={`form-control ${errors.userName && touched.userName ? "is-invalid" : ""}`}
                    />
                    {errors.userName && touched.userName ? <div className='small text-danger'>{errors.userName}</div> : <></>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" id="exampleInputPassword1"
                        value={values.password}
                        onChange={handleChange}
                        name='password'
                        onBlur={handleBlur}
                        className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}
                    />
                    {errors.password && touched.password ? <div className='small text-danger'>{errors.password}</div> : <></>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" id="exampleInputPassword2"
                        value={values.cPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='cPassword'
                        className={`form-control ${errors.cPassword && touched.cPassword? "is-invalid" : ""}`}
                    />
                    {errors.cPassword && touched.cPassword ? <div className='small text-danger'>{errors.cPassword}</div> : <></>}

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        
        </>

    )
}
