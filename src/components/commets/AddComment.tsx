"use client"

import { useUser } from "@/context/userContext";
import styles from "./comments.module.css";
import TextInput from "../formElements/textInput/TextInput";
import { useState } from "react";
import FileInput from "../formElements/fileInput/FileInput";
import Image from "next/image";
import SubmitButton from "../formElements/submitButton/SubmitButton";

export default function AddComment() {
    const {user} = useUser();
    const [comment, setComment] = useState("");
    const [commentImage, setCommentImage] = useState<File>();
    return(
        <div>
            {
                !user && 
                <form className={styles.commentForm}>
                    <TextInput type="text" placeholder="type a comment" setValue={setComment} />
                    <FileInput  changed={setCommentImage} icon="/images/comments/imageFile.ico" />
                    <SubmitButton title="Save" height={30} width={50}/>
                </form>
            }
            {
                commentImage && <Image src={URL.createObjectURL(commentImage)} alt="" width={30} height={30} />
            }
        </div>
    );
}