import Image from "next/image";
import styles from "./pageHeader.module.css";

export default function PageHeader({title, icon}: {title: string, icon?: string}) {
    return(
        <div className={styles.pageHeader}>
            {
                icon &&<Image src={icon} alt={title} width={30} height={30} />
            }
            <h1>{title}</h1>
        </div>
    );
}