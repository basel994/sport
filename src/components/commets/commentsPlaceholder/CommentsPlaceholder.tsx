import styles from "./commentPlaceholder.module.css";
export default function CommentsPlaceholder() {
    return(
        <div className={styles.comment}>
            <div className={styles.info}>
                <div className={styles.user}>
                    <div></div>
                    <h4></h4>
                </div>
                <p className={styles.date}></p>
           </div>
           <p className={styles.content}></p>
        </div>
    );
}