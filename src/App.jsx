import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { logout,login } from './store/authSlice';
import { Header,Footer } from './components/index';
import { Outlet } from 'react-router-dom';

// import Login from './components/Login';
// import Signup from './components/Signup';
// import {PostForm} from './components/index';
import { useSelector } from 'react-redux';
import {Middle} from "./components/index"
import LoadingBar from 'react-top-loading-bar';
import { LoaderProvider, useLoader } from './context/LoaderProvider';
import Done from './components/Done';


function App() {
  // const [count, setCount] = useState(0)

  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  // const [progress,setProgress] = useState(0);
  
  const userData = useSelector(state => state.auth.userData);
  const {progress,setProgress} = useLoader();


  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
    // console.log(userData)
  },[])


  return !loading ? (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div>
        <Done text="Login Successfully"/>
        <Header/>
        {/* dont forget to remove thne height*/ }
        <main >
          <Outlet/>
        </main>
        <Footer className=' mt-[7rem]'/>
        
      </div>
    </div>
  ) : null
}

export default App
