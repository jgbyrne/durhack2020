import React from 'react';
import './App.css';
import FlowMap from "./components/FlowMap";

let flowItemData = [{
    name: "Tempest Sonata",
    description: "A more complex piece, ideal for the initiated",
    thumbnail: "https://picsum.photos/200/200",
    _id: "A",
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200",
    _id: "B",
}, {
    name: "Moonlight Sonata 1",
    description: "A gentle and melancholy introduction to Beethoven",
    thumbnail: "https://picsum.photos/200/200",
    _id: "C",
}];


function App() {
    return (
        <div className="App">
            <FlowMap flowItemData={flowItemData}>
            </FlowMap>
        </div>
    );
}

export default App;
