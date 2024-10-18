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
import TextInput from "../formElements/textInput/TextInput";
import FileInput from "../formElements/fileInput/FileInput";
import { updateComment } from "@/apiFetching/comments/updateComment";
import { truncateText } from "@/functions/truncateText";

export default function Comment({comment, userDetails}: {comment: commentType, userDetails: {name: string, image?: string}}) {
    const router = useRouter();
    const {user} = useUser();
    const [action, setAction] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState<boolean>(false);
    const [newContent, setNewContent] = useState(comment.content);
    const [newImage, setNewImage] = useState<File|undefined>(undefined);
    const oldImage = comment.image;

    const modalBody = action === "update" ? <div>
        <TextInput placeholder="content" setValue={setNewContent} type="text" value={newContent} />
            {
                oldImage ?
                <div className={styles.editImage}>
                    <Image src={newImage?URL.createObjectURL(newImage):oldImage} alt="" width={50} height={50} />
                    <FileInput changed={setNewImage} title="edit image"/>
                </div> :
                <div className={styles.editImage}>
                    {newImage && <Image src={URL.createObjectURL(newImage)} alt="" width={50} height={50} />}
                    <FileInput changed={setNewImage} icon="/images/comments/imageFile.ico"/>
                </div>
            }

    </div> :
    <h3>{`Are you sure you want to delete this comment: " ${truncateText(comment.content, 10)} "`}</h3>;
    const updateHandle = async() => {
        const formData = new FormData();
        formData.append("newContent", newContent);
        if(newImage) {
            formData.append("newImage", newImage);
        }
        const callApi = await updateComment(String(comment.id), formData);
        if(callApi.error) {
            setError(callApi.error)
        }
        else {
            setMessage(callApi.message);
            router.refresh();
        }
    }
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
    const onOk = action === "update" ? updateHandle : deleteHandle;
    const updateClick = () => {
        setAction("update");
        setVisible(true);
    }
    const deleteClick = () => {
        setAction("delete");
        setVisible(true);
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
            user?.id !== comment.user_id && <div className={styles.controlButtons}>
                <ButtonWithIcon size={20} icon="/images/buttons/edit.ico" clicked={updateClick} />
                <ButtonWithIcon size={20} icon="/images/buttons/trash.ico" clicked={deleteClick} />
            </div>
        }
        {
            message !== "" && <TimedNotification bg="black" color="white" duration={5000} message={message} />
        }
        {
            error !== "" && <TimedNotification bg="cyan" color="red" duration={5000} message={error} />
        }
        <Modal visible={visible} closed={setVisible} title={`${action === "update" ? "Update" : "Delete"} comment ${comment.id}`} modalBody={modalBody} onOk={onOk} />
    </div>
    );
}