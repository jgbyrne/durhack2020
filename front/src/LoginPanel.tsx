import React, {FC, useContext, useState} from "react";
import "./LoginPanel.css";
import {LoginContext} from "./LoginContext";
import userIcon from "./components/ui/img/user-icon.svg";
import flowormLogo from "./components/ui/img/floworm-logo-blue.svg";

export const LoginPanel: FC<unknown> = () => {

    const [username, setUsername] = useState<string>("");
    const login = useContext(LoginContext);

    const submit = () => login?.login(username);

    return <div className="LoginPanel">

        <div className="background">
            {[...Array(Math.floor(window.innerWidth * window.innerHeight / 10000))].map(e => <div></div>)};
        </div>
        <div className="middle">
            <img className="logo" src={flowormLogo}/>
            <form onSubmit={e => {
                e.preventDefault();
                submit()
            }}>
                <img className="user-icon" src={userIcon}/>
                <input
                    autoFocus={true}
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    type="password"
                    onSubmit={submit}
                />
                <button
                    type="button"
                    onClick={submit}
                >Sign in</button>
            </form>
        </div>

    </div>

};
