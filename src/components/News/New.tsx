import { NewType } from "@/types/news/newsTypes";
import styles from "./news.module.css";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";
import { truncateText } from "@/functions/truncateText";

export default function New({newItem}: {newItem: NewType}) {
    const date = dateForm(newItem.created_at);
    const truncate = truncateText(newItem.content, 20);
    return(
        <div className={styles.new}>
            <Image src={newItem.image} alt={newItem.image} width={100} height={100} className={styles.newImg} />
            <div className={styles.details}>
                <div className={styles.date}>
                    <Image src="/images/home/new/date.ico" alt="date" width={25} height={25} />
                    <p>{date}</p>
                </div>
                <h2>{newItem.title}</h2>
                <p className={styles.newContent}>{truncate}</p>
            </div>
        </div>
    );
}