import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config';
import {RTE,Button,Select,Input} from '../index'
import { useLoader } from '../../context/LoaderProvider';

function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active',
            }
        }
    )

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const {setProgress} = useLoader();

    const submit = async(data) => {
        setProgress(20)
        if (post) {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            }).finally(()=>{setProgress(100)})
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log(data);
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                }).finally(()=>{setProgress(100)})
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }else{
                setProgress(100)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-")
                // .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(()=>{
        setProgress(20);
        setProgress(100);
    },[])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title),
                    { shouldValidate: true })
            }
        })

        return () => {
            subscription.unsubscribe();
        }

    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className=" p-4 m-2 flex justify-center items-center flex-wrap gap-[1.5rem]">
            <div className="w-[55%] min-w-[485px] px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 w-[50%]"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 w-[50%]"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" className=" w-[95%] m-2 p-2" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-[35%] px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className=" mb-4 w-[50%]"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={post ? ` w-[10rem] hover:scale-90 duration-300 hover:shadow-lg hover:shadow-green-500/30` : ` w-[10rem] hover:scale-90 duration-300 hover:shadow-lg hover:shadow-blue-500/30`}>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm