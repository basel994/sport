import styles from "./button.module.css";

export default function Button({
    width, 
    height, 
    title, 
    bg, 
    color,
clicked,}: {
        width?: number;
        height?: number;
        title: string;
        bg?: string;
        color?: string;
        clicked?: () => void
    }) {
        return(
            <button style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: bg,
                color: color,
            }} 
            className={styles.btn} 
            onClick={clicked}
            >
                {title}
            </button>
        );
    }