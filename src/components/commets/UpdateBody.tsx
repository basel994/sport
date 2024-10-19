import Image from "next/image";
import TextInput from "../formElements/textInput/TextInput";
import styles from "./comments.module.css";
import FileInput from "../formElements/fileInput/FileInput";
import Button from "../button/Button";

export default function UpdateBody({
    newContent,
    setNewContent,
    oldImage,
    setOldImage,
    newImage,
    setNewImage,
}: {
    newContent: string;
    setNewContent: (newContent: string) => void;
    oldImage: string | null;
    setOldImage: (oldImage: string | null) => void;
    newImage: File | undefined;
    setNewImage: (newImage: File | undefined) => void;
}) {
    const removeImage = () => {
        setNewImage(undefined);
    }
    const removeOldImage = () => {
        setOldImage(null);
    }
    return(
        <div>
            <TextInput placeholder="content" setValue={setNewContent} type="text" value={newContent} />
            {
                oldImage ?
                <div className={styles.editImage}>
                    <Image src={newImage?URL.createObjectURL(newImage):oldImage} alt="" width={50} height={50} />
                    <div className={styles.imageCtrl}>
                        <FileInput changed={setNewImage} title="edit image"/>
                        <Button title="remove image" clicked={removeOldImage}/>
                    </div>
                </div> :
                <div className={styles.editImage}>
                    {newImage && <Image src={URL.createObjectURL(newImage)} alt="" width={50} height={50} />}
                    <div className={styles.imageCtrl}>
                       {!newImage ? <FileInput changed={setNewImage} icon="/images/comments/imageFile.ico"/> : <FileInput changed={setNewImage} title="edit image"/> }
                       {newImage && <Button title="remove image" clicked={removeImage}/>}
                    </div>
                </div>
            }

    </div> 
    );
}