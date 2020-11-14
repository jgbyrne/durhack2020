import React, {FC} from 'react';
import './FlowMap.css';
import FlowItem from "./FlowItem";

type FlowMap = {}

let flowItemData = [{
    name: "Tempest Sonata",
    description: "A more complex piece, ideal for the initiated",
    thumbnail: "https://picsum.photos/200/200"
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200"
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200"
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200"
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200"
}];


const FlowMap: FC<FlowMap> = props => {
    return <div className="FlowMap">
        {flowItemData.map(e =>
            <FlowItem {...{...e, x: 0, y: 1}}/>
        )}
    </div>;
};

export default FlowMap;
