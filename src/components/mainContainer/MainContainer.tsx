"use client"
import { useRef } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./mainContainer.module.css";
import Sidebar from "../sidebar/Sidebar";

export default function MainContainer({children}: {children: React.ReactNode}) {
    const mainRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);
    const clickHandle = () => {
        mainRef.current?.classList.toggle(styles.open);
        toggleRef.current?.classList.toggle(styles.close);
    }
    return(
        <>
        <div className={styles.header}>
        <div className={styles.toggle} ref={toggleRef} onClick={clickHandle}><span></span></div>
        <Navbar />
        </div>
        <div className={styles.main} ref={mainRef}>
        <Sidebar />
        <div className={styles.content}>
            {children}
        </div>
        </div>
        </>
    );
}