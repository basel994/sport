"use client"
import { useEffect, useState } from "react";
import styles from "./timedNotification.module.css";

export default function TimedNotification({message, duration, color, bg}: {message: string, duration: number, color: string, bg: string}) {
    const [isVisible, setIsVisible] = useState(true);  

    useEffect(() => {  
        const timer = setTimeout(() => {  
            setIsVisible(false);  
        }, duration);  

        return () => clearTimeout(timer);  
    }, [duration]); 
    return(
        <div 
        style={{color: color, backgroundColor: bg}} 
        className={`${styles.message} ${isVisible ? styles.visible : styles.hidden}`}
        >
            {message}
        </div>
    );
}