import styles from "./submitButton.module.css";
export default function SubmitButton({title}: {title: string}) {
    return(
        <button type="submit" className={styles.submit} >{title}</button>
    );
}