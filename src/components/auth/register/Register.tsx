"use client"
import styles from "./../sharedStyles.module.css";
import TextInput from "@/components/formElements/textInput/TextInput";
import SubmitButton from "@/components/formElements/submitButton/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { registerProcess } from "@/apiFetching/users/registerProcess";
export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {setUser} = useUser();
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email === "" || password === "" || name === "") {
            setError("Email, Password and Name are required!")
        }
        else {
            setError("");
            setLoading(true);
            const callRegister = await registerProcess(email, name, password);
            if(callRegister.error) {
                setError(callRegister.error);
            }
            else {
                setUser(callRegister);
                router.push("/");
            }
            setLoading(false);
        }
    }
    return(
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={onSubmit}>
            <TextInput type="text" placeholder="Name" setValue={setName} />
            <TextInput type="email" placeholder="Email" setValue={setEmail} />
            <TextInput type="password" placeholder="Password" setValue={setPassword} />
            <SubmitButton title={`${loading ? "loading..." : "Register"}`} />
            <p className={styles.error}>{error}</p>
            </form>
        </div>
    );
}