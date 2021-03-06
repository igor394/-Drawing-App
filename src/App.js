import React, {useState} from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import Context from './context/context';
import './App.css'

function App() {
    const [color, setColor] = useState('#000');
    const [font, setFont] = useState(1);
    const [tool, setTool] = useState('brush')
    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null);
    const value ={color, setColor, font, setFont, tool, setTool,canvas, setCanvas,context, setContext};

    return (
        <Context.Provider value={value}>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </Context.Provider>
    );
}

export default App;