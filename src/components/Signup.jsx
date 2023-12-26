import React, {useState,useEffect} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import { login } from '../store/authSlice.js'
import {Button, Input, Logo, SocialSignin} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { useLoader } from '../context/LoaderProvider.jsx'
import { useDone } from '../context/DoneProvider.jsx'


function Signup() {

    const navigate = useNavigate();
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const {register,handleSubmit} =  useForm();
    const {setProgress} = useLoader();

    const {done,setDone} = useDone();


    useEffect(()=>{
        setProgress(20);
        setProgress(100);
    },[])

    const create = async(data)=>{
        setError("")
        try {
            setProgress(20);
            const userData = await authService.createAccount(data).finally(()=>{
                setProgress(100);
                setDone(true);
              });
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className=' relative overflow-hidden'>
        <div className=' flex flex-col gap-2'>

            <div className=' mt-4 mb-2'>
                <span>
                <Logo/>
                </span>
            </div>

            <h2 className=' font-bold  text-[1.7rem]'>
                Sign up to create Account
            </h2>

            <form onSubmit={handleSubmit(create)}>
                <div className=" flex flex-wrap flex-col items-center m-2 p-2">

                    <Input
                        label = "Full Name: "
                        placeholder = "Enter your full name"
                        {...register("name",{
                            required:true,
                        })}
                    />

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
                        label="Password"
                        type="password"
                        placeholder="Enter Your Password"
                        {...register("password",{
                            required:true,
                        })}
                    />

                    <Button
                        type="submit"
                        className=' hover:scale-[110%] hover:shadow-lg hover:shadow-blue-500/30 duration-300 '
                    >Create Account</Button>


                </div>
            </form>

            {error && <p className=' text-red-400 duration-500'>{error}</p>}

            <SocialSignin/>

            
            <p>
                Already have an Account?&nbsp;
                <Link
                    className=' text-blue-500 hover:underline duration-300'
                    to="/login"
                >
                    Sign In
                </Link>
            </p>

        </div>
    </div>
  )
}

export default Signup