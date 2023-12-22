import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className=' w-[100%] max-w-[20rem] p-2'>
            <div>
                <img
                className=' rounded-[15px] hover:rounded-[5px] hover:border-gray-50 border-[1.8px] duration-[400ms] hover:scale-[85%]' 
                src={appwriteService.getFilePreview(featuredImage)} 
                alt={title} 
                />
            </div>
            <h2 className=' text-center m-1'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard