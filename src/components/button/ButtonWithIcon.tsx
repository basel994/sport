import Image from "next/image";
import styles from "./button.module.css";

export default function ButtonWithIcon({size, icon, clicked}: {size: number, icon: string, clicked?: () => void}) {
        return(
            <div className={styles.container} style={{
                width: `${size}px`,
                height: `${size}px`
            }} 
            onClick={clicked}
            >
             <Image src={icon} alt="" width={size} height={size} />
            </div>
        );
    }