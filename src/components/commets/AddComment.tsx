"use client"

import { useUser } from "@/context/userContext";
import styles from "./comments.module.css";
import TextInput from "../formElements/textInput/TextInput";
import { FormEvent, useState } from "react";
import FileInput from "../formElements/fileInput/FileInput";
import SubmitButton from "../formElements/submitButton/SubmitButton";
import { addComment } from "@/apiFetching/comments/addComment";
import { useRouter } from "next/navigation";
import TimedNotification from "../timedNotification/TimedNotification";

export default function AddComment({new_id}: {new_id: string}) {
    const router = useRouter();
    const {user} = useUser();
    const [comment, setComment] = useState("");
    const [commentImage, setCommentImage] = useState<File>();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    console.log(comment);
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("new_id", new_id);
        formData.append("content", comment);
        if(commentImage){
            formData.append("image", commentImage);
        }
        const callApi = await addComment(formData);
        if(callApi.error) {
            setError(callApi.error);
            setMessage("");
        }
        setMessage(callApi.message);
        setError("");
        router.refresh();

    }
    return(
        <div>
            {
                user && 
                <form className={styles.commentForm} onSubmit={onSubmit}>
                    <TextInput type="text" placeholder="type a comment" setValue={setComment} />
                    <FileInput  changed={setCommentImage} icon="/images/comments/imageFile.ico" />
                    <SubmitButton title="Save" height={30} width={50}/>
                </form>
            }
            {
                message !== "" && <TimedNotification bg="rgba(0, 0, 0, 0.5)" color="white" duration={5000} message={message} />
            }
            {
                error !== "" && <TimedNotification bg="rgba(214, 1, 1, 0.5)" color="white" duration={5000} message={error} />
            }
        </div>
    );
}