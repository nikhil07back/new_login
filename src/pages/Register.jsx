import React, { useEffect, useState } from 'react'
import Spinner from "../components/Spinner"
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { register } from '../features/auth/authSlice'
import {useNavigate} from "react-router-dom"
import { reset } from '../features/auth/authSlice'

function Register() {
  
  const {user , message , isSuccess , isLoading , isError} = useSelector(state => state.auth)

  const navigate = useNavigate()

  const [formData , setFormData] = useState({
    name : "",
    email : "",
    password : "",
    password2 : ""
  })
  
  const {name , email , password , password2} = formData

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  
  
  const handleSubmit = (e) => {

    e.preventDefault()

    if(password !== password2){
      toast.error("Passwords Don't Match!!")
    }

    const userData = {
      name,
      email,
      password
    }   

    dispatch(register(userData))

    setFormData({
      name : "",
      email : "",
      password : "",
      password2 : ""
    })

  }


  useEffect(()=>{

    if(user || isSuccess){
      navigate('/')
    }

    if(isError){
      toast.error(message)
    }

    dispatch(reset())


  },[user , message , isSuccess , isLoading , isError , dispatch])

  
  if(isLoading){
    return (
      <Spinner/>
    )
  }


  return (
    <>
       <section className='heading'>
            <h1>
               Register
            </h1>
            <p>Please create an account</p>
          </section>
    
          <section className='form'>
            <form onSubmit={(e)=>handleSubmit(e)} >
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={name}
                  onChange={ e => handleChange(e)}
                  placeholder='Enter your name'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  onChange={ e => handleChange(e)}
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
                  onChange={ e => handleChange(e)}
                  placeholder='Enter password'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={password2}
                  onChange={ e => handleChange(e)}
                  placeholder='Confirm password'
                  required
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-block'>Submit</button>
              </div>
            </form>
          </section>
    </>
  )
}

export default Register