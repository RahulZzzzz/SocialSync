import React from 'react'
import google from '../assets/google.jpg'
import authService, {account} from '../appwrite/auth';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../store/authSlice';

function SocialSignin() {


    const url = window.location.href;
    const dispatch = useDispatch();

    

    const googleAuth = async(e)=>{
        e.preventDefault();

        const res = await account.createOAuth2Session(
            'google',
            `${url}`,
            `${url}`
        )
        // .finally(async()=>{
        //     const userData = await authService.getCurrentUser();
        //     if(userData) dispatch(login({userData}))
        //     const userInfo = useSelector((state)=> state.auth.userData);
        //     console.log(userInfo);
        // })

        // .finally(()=>{
        //     const userData = useSelector((state)=>(state.auth.userData))
        //     console.log(userData);
        // })

    }

  return (
    <div className=' mx-auto flex flex-wrap justify-center w-[30%] gap-2 mb-3'>
        <button
         onClick={(e)=>{googleAuth(e)}}
         className=' flex border-2 border-neutral-100 max-w-[200px]'
        >
            <div className=' border-r-2 border-neutral-900 max-w-[45px]'>
                <img src={google} alt="" />
            </div>
            <div className=' my-auto px-2'>
                Login with Google
            </div>
        </button>
    </div>
  )
}

export default SocialSignin