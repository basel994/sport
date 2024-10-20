import { commentType } from "@/types/comments/commentType";
import styles from "./comments.module.css";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";
import CommentControl from "./CommentControl";

export default function Comment({comment, userDetails}: {comment: commentType, userDetails: {name: string, image?: string}}) {  
    return(
        <div className={styles.comment}>
        <div className={styles.info}>
            <div className={styles.user}>
                {
                    <Image src={userDetails.image ? userDetails.image : "/images/home/new/noImage.ico"} alt="" width={40} height={40} />
                }
                <h4>{userDetails?.name}</h4>
            </div>
            <div className={styles.dateContainer}>
                <p className={styles.date}>{dateForm(comment.created_at)}</p>
                {comment.updated_at && <div className={styles.updated}>
                    <Image src="/images/buttons/edit.ico" alt="" width={15} height={15} />
                    <p className={styles.edited}>Edited</p>
                </div>}
            </div>
        </div>
        <p>{comment.content}</p>
        {
            comment.image && <Image src={comment.image} alt="" width={100} height={100} />
        }
        <CommentControl comment={comment}/>
    </div>
    );
}