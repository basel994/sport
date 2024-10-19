import Button from "../button/Button";
import styles from "./modal.module.css";

export default function Modal ({
    title,
    visible,
    closed,
    modalBody,
    headerBg,
    onOk
}: {
    title: string;
    visible: boolean;
    closed: (visible: boolean) => void;
    modalBody: React.ReactNode;
    headerBg?: string;
    onOk: () => void
}) {

    const closeHandle = () => {
        closed(false)
    }
    return(
        <div className={`${styles.container} ${visible ? styles.show : styles.hide}`} >
            <div className={styles.modal}>
                <div className={styles.header} style={{backgroundColor: headerBg}}>
                    <h2>{title}</h2>
                    <div className={styles.closeContainer} onClick={closeHandle}>
                        <span className={styles.close}></span>
                    </div>
                </div>
                <div className={styles.body} >{modalBody}</div>
                <div className={styles.footer} >
                    <Button title="Save" height={50} width={75} bg="rgb(21, 94, 94)" color="rgb(255, 255, 255)" clicked={onOk} />
                    <Button title="Cancel" height={50} width={75} bg="rgb(240, 55, 55)" color="rgb(255, 255, 255)" clicked={closeHandle} />
                </div>
            </div>
        </div>
    );
}