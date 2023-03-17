import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {login} from "../features/auth/authSlice"
function Login() {

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  const navigate = useNavigate()
  
  const [formData , setFormData] = useState({
    email : "",
    password : ""
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  
  const {email , password} = formData
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))

   

  }

  useEffect(() => {
    if(isError){
       toast.error(message)
    }
    if(isSuccess || user){
       navigate('/')
    }  
    

     // dispatch(reset())

 },[isError, isLoading, isSuccess, user, message, dispatch, navigate])




  return (
    <div>
      <section className='heading'>
            <h1>
            Login
            </h1>
            <p>Please log in to get support</p>
          </section>
    
          <section className='form' >
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  placeholder='Enter password'
                  required
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-block'>Submit</button>
              </div>
            </form>
          </section>
    </div>
  )
}

export default Login