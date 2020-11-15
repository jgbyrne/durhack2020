// @ts-ignore
import React, {FC} from "react";
import "./SearchBar.css";
import searchIcon from "./img/search-icon.svg";

const SearchBar: FC = () => {
    return <div className="SearchBar">
        <img src={searchIcon}/>
    </div>
};

export default SearchBar;