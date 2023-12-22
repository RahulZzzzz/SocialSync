import React, { useEffect, useState } from 'react'
import { PostCard , Container, Middle} from '../components/index'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
import { useLoader } from '../context/LoaderProvider';

function AllPosts() {

    const [posts,setPosts] = useState([]);
    const {setProgress} = useLoader();
    // const userData = useSelector((state)=> state.auth.userData);

    useEffect(()=>{
        setProgress(20);
        appwriteService.getAllPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
                // console.log(posts);
            }
        }).finally(()=>{setProgress(100);})
        
    },[])

    

  return (
    <div>
        <Middle username="ALL POST"/>
        <Container>
            <div className=' bg-neutral-900 flex flex-wrap justify-center items-center'>
                {posts.map((post) => (
                    <div key={post.$id} className=' min-w-[9rem] w-[12%] flex m-6' >
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts