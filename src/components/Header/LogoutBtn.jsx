import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../context/LoaderProvider';

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setProgress} = useLoader();

    const logoutHandler = ()=>{
        setProgress(20)
        authService.logout().then(()=>{
            dispatch(logout());
            navigate('/')
        }).finally(()=>{setProgress(100)})
    }    

    return (
        <button
            className=' font-semibold block px-6 py-2 duration-200 hover:bg-neutral-800 rounded-full'
            onClick={logoutHandler}
        >
            
            LogOut
        </button>
    )
}

export default LogoutBtn