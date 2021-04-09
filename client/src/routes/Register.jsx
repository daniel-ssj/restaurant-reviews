import React, { useState } from 'react'
import AuthApi from '../apis/AuthApi'
import { Link } from 'react-router-dom'

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = inputs

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await AuthApi.post('/register', {
        name,
        email,
        password,
      })

      localStorage.setItem('token', res.data.token)
      setAuth(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div>
        <h1 className='mt-4'>Register</h1>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='form-control my-3'
          value={name}
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='form-control my-3'
          value={email}
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='form-control my-3'
          value={password}
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        />
        <div className='d-flex flex-column'>
          <button className='btn btn-primary' onClick={(e) => handleSubmit(e)}>
            Register
          </button>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </>
  )
}

export default Register
