"use client"
import styles from "./login.module.css";
import TextInput from "@/components/formElements/textInput/TextInput";
import SubmitButton from "@/components/formElements/submitButton/SubmitButton";
import { useState } from "react";
export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name);
        console.log(password);
    }
    return(
        <div className={styles.login}>
            <form className={styles.form} onSubmit={onSubmit}>
            <TextInput type="text" placeholder="Name" setValue={setName} />
            <TextInput type="password" placeholder="Password" setValue={setPassword} />
            <SubmitButton title="Login" />
            </form>
        </div>
    );
}