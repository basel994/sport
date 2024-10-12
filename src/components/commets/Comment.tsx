"use client"
import { commentType } from "@/types/comments/commentType";
import styles from "./comments.module.css";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";
import { useUser } from "@/context/userContext";
import ButtonWithIcon from "../button/ButtonWithIcon";

export default function Comment({comment, userDetails}: {comment: commentType, userDetails: {name: string, image?: string}}) {
    const {user} = useUser();
    return(
        <div key={comment.id} className={styles.comment}>
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
                <ButtonWithIcon size={20} icon="/images/buttons/trash.ico" />
            </div>
        }
        
    </div>
    );
}