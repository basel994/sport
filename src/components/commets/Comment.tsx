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
import Modal from "../modal/Modal";
import { updateComment } from "@/apiFetching/comments/updateComment";
import { truncateText } from "@/functions/truncateText";
import UpdateBody from "./UpdateBody";

export default function Comment({comment, userDetails}: {comment: commentType, userDetails: {name: string, image?: string}}) {
    const router = useRouter();
    const {user} = useUser();
    const [action, setAction] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState<boolean>(false);
    const [newContent, setNewContent] = useState(comment.content);
    const [newImage, setNewImage] = useState<File|undefined>(undefined);
    const [oldImage, setOldImage] = useState<string|null>(comment.image);

    const modalBody = action === "update" ? <UpdateBody 
    newContent={newContent} 
    setNewContent={setNewContent} 
    oldImage={oldImage} 
    setOldImage={setOldImage}
    newImage={newImage} 
    setNewImage={setNewImage}/> :
    <div>
        <h3 className={styles.deleteConfirm}>Are you sure you want to delete this comment: </h3>
        <p>{`"${truncateText(comment.content, 10)}"`}</p>
    </div>;
    
    const updateClick = () => {
        setAction("update");
        setVisible(true);
        setNewContent(comment.content);
        setOldImage(comment.image);
    }
    
    const deleteClick = () => {
        setAction("delete");
        setVisible(true);
    }

    const updateHandle = async() => {
        const formData = new FormData();
        formData.append("newContent", newContent);
        if(newImage) {
            formData.append("newImage", newImage);
        }
        if(oldImage) {
            formData.append("oldImage", oldImage);
        }
        const callApi = await updateComment(String(comment.id), formData);
        if(callApi.error) {
            setError(callApi.error);
            setMessage("");
            setVisible(false);
        }
        else {
            setMessage(callApi.message);
            setError("");
            setVisible(false);
            router.refresh();
        }
    }

    const deleteHandle = async() => {
        const callApi = await deleteComment(String(comment.id));
        if(!callApi.error) {
            setMessage(callApi.message);
            setError("");
            setVisible(false);
            router.refresh();
        }
        else {
            setError(callApi.error);
            setMessage("");
            setVisible(false);
        }
    }

    const onOk = action === "update" ? updateHandle : deleteHandle;
    
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
            user?.id !== comment.user_id && <div className={styles.controlButtons}>
                <ButtonWithIcon size={20} icon="/images/buttons/edit.ico" clicked={updateClick} />
                <ButtonWithIcon size={20} icon="/images/buttons/trash.ico" clicked={deleteClick} />
            </div>
        }
        {
            message !== "" && <TimedNotification bg="rgba(0, 0, 0, 0.5)" color="white" duration={5000} message={message} />
        }
        {
            error !== "" && <TimedNotification bg="rgba(214, 1, 1, 0.5)" color="white" duration={5000} message={error} />
        }
        <Modal visible={visible} 
        closed={setVisible} 
        title={`${action === "update" ? "Update" : "Delete"} comment ${comment.id}`} 
        modalBody={modalBody} onOk={onOk} 
        headerBg={action==="update" ? "rgb(168, 224, 241)" : "rgb(248, 166, 166)"}/>
    </div>
    );
}