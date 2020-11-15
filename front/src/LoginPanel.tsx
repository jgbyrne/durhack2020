import React, {FC, useContext, useState} from "react";
import {LoginContext} from "./LoginContext";

export const LoginPanel: FC<unknown> = () => {

    const [username, setUsername] = useState<string>("");
    const login = useContext(LoginContext);

    return <>
        <form onSubmit={e => e.preventDefault()}>
            <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
            <button type="button" onClick={() => login?.login(username)}>Login</button>
        </form>
    </>

};
