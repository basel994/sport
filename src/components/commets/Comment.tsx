"use client"
import { commentType } from "@/types/comments/commentType";
import styles from "./comments.module.css";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";
import { useUser } from "@/context/userContext";
import ButtonWithIcon from "../button/ButtonWithIcon";
import { deleteComment } from "@/apiFetching/comments/deleteComment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TimedNotification from "../timedNotification/TimedNotification";

export default function Comment({comment, userDetails}: {comment: commentType, userDetails: {name: string, image?: string}}) {
    const router = useRouter();
    const {user} = useUser();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const deleteHandle = async() => {
        const callApi = await deleteComment(String(comment.id));
        if(!callApi.error) {
            setError("");
            setMessage(callApi.message);
            router.refresh();
        }
        else {
            setError(callApi.error);
            setMessage("");
        }
    }
    return(
        <div className={styles.comment}>
        <div className={styles.info}>
            <div className={styles.user}>
                {
                    <Image src={userDetails.image ? userDetails.image : "/images/home/new/noImage.ico"} alt="" width={40} height={40} />
                }
                <h4>{userDetails?.name}</h4>
            </div>
            <p className={styles.date}>{dateForm(comment.created_at)}</p>
        </div>
        <p>{comment.content}</p>
        {
            comment.image && <Image src={comment.image} alt="" width={100} height={100} />
        }
        {
            user?.id === comment.user_id && <div className={styles.controlButtons}>
                <ButtonWithIcon size={20} icon="/images/buttons/edit.ico" />
                <ButtonWithIcon size={20} icon="/images/buttons/trash.ico" clicked={deleteHandle} />
            </div>
        }
        {
          message !== "" && <TimedNotification bg="black" color="white" duration={5000} message={message} />
        }
                {
          error !== "" && <TimedNotification bg="cyan" color="red" duration={5000} message={error} />
        }
    </div>
    );
}