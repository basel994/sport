"use client"
import styles from "./login.module.css";
import TextInput from "@/components/formElements/textInput/TextInput";
import SubmitButton from "@/components/formElements/submitButton/SubmitButton";
import { useState } from "react";
import { checkUser } from "@/apiFetching/users/checkUser";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {setUser} = useUser();
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        if(email === "" || password === "") {
            setError("Email and Password are required!")
        }
        else {
            setError("");
            setLoading(true);
            const callCheckUser = await checkUser(email, password);
            if(callCheckUser.error) {
                setApiResponse(callCheckUser.error);
            }
            else {
                setUser(callCheckUser.name);
                router.push("/");
            }
            setLoading(false);
        }
    }
    return(
        <div className={styles.login}>
            <form className={styles.form} onSubmit={onSubmit}>
            <TextInput type="email" placeholder="Email" setValue={setEmail} />
            <TextInput type="password" placeholder="Password" setValue={setPassword} />
            <SubmitButton title={`${loading ? "loading..." : "Login"}`} />
            <p className={styles.error}>{error} {apiResponse}</p>
            </form>
        </div>
    );
}