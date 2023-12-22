import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useLoader } from "../context/LoaderProvider";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const {setProgress} = useLoader();

    useEffect(() => {
        setProgress(20);
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally(()=>{setProgress(100)});
        }else{
            setProgress(100);
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        setProgress(20);
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        }).finally(()=>{setProgress(100)});
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex flex-row justify-evenly items-center mb-4 relative rounded-xl p-2">
                    <div>
                        <div className="w-full mb-6">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                        </div>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className=" border p-2 max-h-[42rem] max-w-2xl rounded-xl"
                        />
                        <div className=" mt-7 browser-css">
                            {parse(post.content)}
                        </div>

                    </div>

                    {isAuthor && (
                        <div className=" w-[30%] ">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className=" w-48 mr-3 hover:scale-90 duration-300">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className=" w-48 mr-3 hover:scale-90 duration-300" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                
                
            </Container>
        </div>
    ) : null;
}