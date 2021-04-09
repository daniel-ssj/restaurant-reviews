import React, { useState } from 'react'
import AuthApi from '../apis/AuthApi'
import { Link } from 'react-router-dom'

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const { email, password } = inputs

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await AuthApi.post('/login', {
        email,
        password,
      })

      localStorage.setItem('token', res.data.token.slice(2, -1))
      setAuth(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1 className='mt-4'>Login</h1>

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
          Login
        </button>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  )
}

export default Login
