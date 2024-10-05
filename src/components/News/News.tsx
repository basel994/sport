import { newsFetching } from "@/apiFetching/news/newsFetching";
import styles from "./news.module.css";
import New from "./New";

export default async function News() {
    const fetchedNews = await newsFetching();
    return(
        <div className={styles.news}>
            {
                fetchedNews.map((newItem) => {
                    return(
                        <New newItem={newItem} />
                    );
                })
            }
        </div>
    );
}