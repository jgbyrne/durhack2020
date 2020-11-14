import React, {FC, useState} from "react"


export type User = {
    username: string,
}

export type Login = {
    login: (username: string) => User,
    user: User | null,
}

const LoginContext = React.createContext<Login | null>(null);

export const LoginProvider: FC<unknown> = props => {

    const [user, setUser] = useState<User | null>(null)

    const login: Login["login"] = username => {

        const newUser: User = {
            username
        }
        setUser(newUser)

        return newUser

    }

    return <LoginContext.Provider value={{user, login}}>
        {props.children}
    </LoginContext.Provider>
}