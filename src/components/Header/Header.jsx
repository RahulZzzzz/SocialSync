import React from 'react'
import { Container,Logo,LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { login } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Header() {

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  // dispatch(login({userData:{userName:"Rahul",pass:"12345"}}));

  // useEffect(()=>{
  //   dispatch(login({userData:{userName:"Rahul",pass:"12345"}}));
  // },[])

  // login({userName:"Rahul",pass:"12345"});

  const authStatus = useSelector((state) => state.auth.status);
  // const authUser = useSelector((state)=>state.userData);

  // console.log(authStatus);
  // console.log(authUser);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className=' bg-neutral-900 border-b-[1px] border-zinc-400 backdrop-blur z-40 py-3 sticky top-0'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex gap-2 mr-2 ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => {
                  navigate(item.slug)
                }}
                className=' font-semibold inline-bock px-6 py-2 duration-200 hover:bg-neutral-800 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header