import Image from "next/image";
import styles from "./fileInput.module.css";

export default function FileInput({changed, icon, title}: {
    changed: (value: File) => void;
    icon?: string;
    title?: string;
}) {
    const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            changed(file);
        }
    }
    return(
        <label className={styles.fileInputLabel}>
            <input 
            type="file"
            onChange={changeHandle}
            accept="image/*" 
            className={styles.fileInput}
            />
            {
                icon && <Image src={icon} alt="" width={25} height={25} /> 
            }
            {
                title && <span>{title}</span>
            }
        </label>
    );
}