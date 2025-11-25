import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'

function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const navigate = useNavigate();

  const handleCheckbox = (gender)=>{
    setUser({...user, gender})
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success){
        navigate("/login");

        toast.success(res.data.message)
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }

  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400/10 backdrop-blur-lg bg-clip-padding border border-gray-100'>
          <h1 className='text-3xl font-bold text-center text-black'>Signup</h1>
          <form onSubmit={onSubmitHandler} action="">
            <div>
              <label className='label p-2 text-black'>
                <span className='text-base label-text'>Full Name</span>
              </label>
              <br />
              <input 
              value={user.fullName}
              onChange={(e)=>setUser({...user, fullName:e.target.value})}
              className='w-full input input-bordered h-10'
              type="text" placeholder='Full Name' />
            </div>
            <div>
              <label className='label p-2 text-black'>
                <span className='text-base label-text'>Username</span>
              </label>
              <br />
              <input 
              value={user.username}
              onChange={(e)=>setUser({...user, username:e.target.value})}
              className='w-full input input-bordered h-10'
              type="text" placeholder='Username' />
            </div>
            <div>
              <label className='label p-2 text-black'>
                <span className='text-base label-text'>Password</span>
              </label>
              <br />
              <input 
              value={user.password}
              onChange={(e)=>setUser({...user, password:e.target.value})}
              className='w-full input input-bordered h-10'
              type="password" placeholder='Password' />
            </div>
            <div>
              <label className='label p-2 text-black'>
                <span className='text-base label-text'>Confirm Password</span>
              </label>
              <br />
              <input 
              value={user.confirmPassword}
              onChange={(e)=>setUser({...user, confirmPassword:e.target.value})}
              className='w-full input input-bordered h-10'
              type="password" placeholder='Confirm Password' />
            </div>
            <div className='flex m-2'>
              <div>
                <p className='text-black inline p-2'>Male</p>
                <input 
                type="checkbox"
                checked={user.gender === "male"} 
                onChange={()=>handleCheckbox("male")}
                defaultChecked 
                className="checkbox" />
              </div>
              <div>
                <p className='text-black inline p-2'>Female</p>
                <input 
                type="checkbox" 
                checked={user.gender === "female"} 
                onChange={()=>handleCheckbox("female")}
                defaultChecked 
                className="checkbox" />
              </div>
            </div>
            <Link to="/login">
            Already have an account?
            </Link>
            <div>
              <button type='submit' className='btn btn-block btn-md mt-2 border border-slate-700'>Signup</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Signup
