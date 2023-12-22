import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, Middle, PostCard } from '../components/index'
import { useSelector } from 'react-redux';
import { useLoader } from '../context/LoaderProvider';

function Home() {

    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData)
    const authStatus = useSelector((state)=>state.auth.status)
    const {setProgress} = useLoader();

    useEffect(() => {
        setProgress(20)
        if (authStatus) {
            
            appwriteService.getPosts(userData.$id).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            }).finally(()=>{setProgress(100)})
        }else{
            setProgress(100);
        }
    }, [])


    


    if (!authStatus) {
        return (
            <div>
                <Container>
                    <div className=' bg-neutral-900'>
                        <div>
                            <h1 className=' font-semibold text-2xl'>
                                Login to Read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else {

        if (posts.length === 0) {
            return (
                <div>
                    <Middle username={userData.name}/>
                    <Container>
                        <div className=' bg-neutral-900'>
                            <div>
                                <h1 className=' font-semibold text-2xl'>
                                    Post Your First BLOG!!
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }

        return (
            <div>
                <Middle username={userData.name}/>
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




}

export default Home