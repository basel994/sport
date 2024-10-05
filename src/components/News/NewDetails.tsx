import styles from "./news.module.css";
import { newDetailsFetching } from "@/apiFetching/news/newDetailsFetching";
import { dateForm } from "@/functions/dateForm";
import Image from "next/image";

export default async function NewDetail({newId}: {newId: string}) {
    const newDetails = await newDetailsFetching(newId);
    return(
        <>
            {
                newDetails && (<div className={styles.newDetailsContainer}>
                    <Image src={newDetails.image} alt="new image" width={300} height={300} />
                    <div className={styles.date}>
                        <Image src="/images/home/new/date.ico" alt="date" width={25} height={25} />
                        <p>{dateForm(newDetails.created_at)}</p>
                    </div>
                    <h1>{newDetails.title}</h1>
                    <p>{newDetails.content}</p>
                </div>)
            }
        </>
    )
}