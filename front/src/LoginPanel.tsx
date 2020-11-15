import React, {FC, useContext, useState} from "react";
import {LoginContext} from "./LoginContext";

export const LoginPanel: FC<unknown> = () => {

    const [username, setUsername] = useState<string>("");
    const login = useContext(LoginContext);

    const submit = () => login?.login(username)

    return <>
        <form onSubmit={e => {
            e.preventDefault()
            submit()
        }}>
            <input autoFocus={true} type="text" onChange={e => setUsername(e.target.value)} value={username}/>
            <button type="button" onClick={submit}>Login</button>
        </form>
    </>

};
