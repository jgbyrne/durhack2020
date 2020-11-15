// @ts-ignore
import React, {FC} from "react";
import "./UserMenu.css";
import userIcon from "./img/user-icon.svg";

const UserMenu: FC = () => {
    return <div className="UserMenu">
        <img src={userIcon}/>
    </div>
};

export default UserMenu;