import React, { useEffect, useState } from 'react'
import {Button,Input,Logo, SocialSignin} from './index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch,useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { useLoader } from '../context/LoaderProvider'
import Done from './Done'
import { useDone } from '../context/DoneProvider'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register,handleSubmit} = useForm()
  const [error,setError] = useState("")
  const {setProgress} = useLoader();

  const {done,setDone} = useDone();

  useEffect(()=>{
    setProgress(20);
    setProgress(100);
  },[])

  const login = async(data)=>{
    setError("");
    try {
      setProgress(20);
      const session = await authService.login(data).finally(()=>{
        setProgress(100);
        setDone(true);
        setTimeout(()=>{
          setDone(false);
        },2000)
      });
      if(session){
        const userData = await authService.getCurrentUser();
        // console.log(userData)
        // console.log("After .getCurrentUser");
        if(userData) dispatch(authLogin({userData}))
        const userInfo = useSelector((state)=> state.auth.userData);
        // console.log(userInfo);
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className=' relative overflow-hidden'>

        <Done text="Login Successfully"/>
        <div className=' flex flex-col gap-2'>

          <div className=' mt-4 mb-2'>
            <span>
              <Logo/>
            </span>
          </div>

          <h2 className=' font-bold  text-[1.7rem]'>
            Sign in to your Account
          </h2>
          

          <form onSubmit={handleSubmit(login)}>
            <div className=" flex flex-wrap flex-col items-center m-2 p-2">
              <Input
                label="Email: "
                placeholder = "Enter your Email"
                type = "email"
                {...register("email",{
                  required: true,
                  validate: {
                    matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                  }
                })}
              />
              <Input
                label= "Password: "
                type= "password"
                placeholder="Enter your password"
                {...register("password",{
                  required:true,
                })}
              />

              <Button
                type="submit"
                className=' hover:scale-[110%] hover:shadow-lg hover:shadow-blue-500/30 duration-300 '
              >Sign in</Button>

            </div>
          </form>

          {error && <p className=' text-red-400 duration-500'>{error}</p>}

          <SocialSignin/>


          <p>
            Don&apos;t have any Account?&nbsp;
            <Link
              className=' text-blue-500 hover:underline duration-300'
              to="/signup"
            >
              Sign up
            </Link>
          </p>

        </div>
    </div>
  )
}

export default Login