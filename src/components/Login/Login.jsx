import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { logSchema } from '../schemas/login.jsx'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header.jsx'

export default function Login({ getUser }) {
  let [error, setError] = useState([])
  let navigate = useNavigate()
  let { errors, values, handleChange, handleSubmit, handleBlur, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: logSchema,
    onSubmit: register
  })
  async function register(values) {
    let { data } = await axios.post('https://ecommerce-node-3.vercel.app/auth/login', values)
    if (data.message === "Done") {
      localStorage.setItem('token', data.token)
      getUser()
      navigate('/movie')
    } else {
      setError(data.err[0])
    }
    console.log(data)
  }
  return (
    <>
      <Header
        title="Login to See Our Movies"
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
        <form className='w-50 m-auto text-center mb-5 py-5' onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    </>

  )
}
