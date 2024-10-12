import styles from "./submitButton.module.css";
export default function SubmitButton({title, width, height}: {title: string, width?: number, height?: number}) {
    return(
        <button type="submit" className={styles.submit} style={{width: `${width}px`, height: `${height}px`}}>{title}</button>
    );
}