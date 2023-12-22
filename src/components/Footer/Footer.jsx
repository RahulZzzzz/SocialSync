import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer({className}) {
  return (
    
    <div className={`m-2 p-2 flex flex-row justify-between gap-[5rem] ${className} `}>
      

        <div className=' flex flex-col'>
            <div className=' w-full h-[80%]'>
                <Logo/>
            </div>
            <div>
                <p className=' text-zinc-500'>
                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
            </div>
        </div>

        <div className='flex flex-col gap-4 text-slate-200'>
          <h3 className=' font-bold '>
              Company
          </h3>
          <ul className=' flex flex-col gap-2 text-slate-400 '>
              <li>
                  <Link 
                    className='  hover:text-slate-100'
                    to="/"
                  >
                      Features
                  </Link>
              </li>
              <li >
                  <Link
                     className='  hover:text-slate-100'
                      to="/"
                  >
                      Pricing
                  </Link>
              </li>
              <li>
                  <Link
                      className='  hover:text-slate-100' 
                      to="/"
                  >
                      Affiliate Program
                  </Link>
              </li>
              <li>
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Press Kit
                  </Link>
              </li>
          </ul>
        </div>

        <div className='flex flex-col gap-4 text-slate-200'>
          <h3 className=' font-bold '>
              Support
          </h3>
          <ul className=' flex flex-col gap-2 text-slate-400 '>
              <li>
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Account
                  </Link>
              </li>
              <li >
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Help
                  </Link>
              </li>
              <li >
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Contact Us
                  </Link>
              </li>
              <li>
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Customer Support
                  </Link>
              </li>
          </ul>
        </div>

        <div className='flex flex-col gap-4 text-slate-200'>
          <h3 className=' font-bold '>
              Legals
          </h3>
          <ul className=' flex flex-col gap-2 text-slate-400 '>
              <li >
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Terms &amp; Conditions
                  </Link>
              </li>
              <li >
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Privacy Policy
                  </Link>
              </li>
              <li>
                  <Link
                      className='  hover:text-slate-100'
                      to="/"
                  >
                      Licensing
                  </Link>
              </li>
          </ul>
        </div>


    </div>

    

  )
}

export default Footer