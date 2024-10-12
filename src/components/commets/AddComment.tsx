"use client"

import { useUser } from "@/context/userContext";
import styles from "./comments.module.css";
import TextInput from "../formElements/textInput/TextInput";
import { useState } from "react";
import FileInput from "../formElements/fileInput/FileInput";
import SubmitButton from "../formElements/submitButton/SubmitButton";
import { addComment } from "@/apiFetching/comments/addComment";
import { revalidateTag } from "next/cache";

export default function AddComment({new_id}: {new_id: string}) {
    const {user} = useUser();
    const [comment, setComment] = useState("");
    const [commentImage, setCommentImage] = useState<File>();
    const [message, setMessage] = useState("");
    console.log(comment);
    const onSubmit = async () => {
        const formData = new FormData();
        formData.append("new_id", new_id);
        formData.append("content", comment);
        if(commentImage){
            formData.append("image", commentImage);
        }
        const callApi = await addComment(formData);
        setMessage(callApi.message);
        revalidateTag("comments");
    }
    return(
        <div>
            {
                !user && 
                <form className={styles.commentForm} onSubmit={onSubmit}>
                    <TextInput type="text" placeholder="type a comment" setValue={setComment} />
                    <FileInput  changed={setCommentImage} icon="/images/comments/imageFile.ico" />
                    <SubmitButton title="Save" height={30} width={50}/>
                    <label>{message}</label>
                </form>
            }
        </div>
    );
}