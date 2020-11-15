// @ts-ignore
import React, {FC} from "react";
import "./CategoryTitle.css";
// @ts-ignore
import categoryLogo from './img/category-icon.svg';

const CategoryTitle: FC = () => {
    return <div className="CategoryTitle">
        <img src={categoryLogo}/>
        <div className="text">Albums</div>
    </div>
};

export default CategoryTitle;