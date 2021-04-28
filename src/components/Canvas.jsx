import React, {useEffect, useRef, useState, useContext} from 'react';
import Context from '../context/context';


const Canvas = () => {
    const {color, font} = useContext(Context);
    const canvasRef = useRef();
    const contextRef = useRef()
    const [isDrawing, setIsDrawing] = useState(false)
    const [x, setX]= useState(null);
    const [y,setY] = useState(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = font;
        contextRef.current = context;
    },[color, font])


    // const mouseDown=(e) => {
    //     contextRef.current.beginPath();
    //     contextRef.current.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    //     setIsDrawing(true);
    // }
    // const draw = (e) => {
    //     if (!isDrawing) {
    //         return;
    //     }
    //     // const { offsetX, offsetY } = nativeEvent;
    //     // console.log(nativeEvent)
    //     contextRef.current.lineTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    //     contextRef.current.stroke();
    // };
    // const mouseUp=() => {
    //     contextRef.current.closePath();
    //     setIsDrawing(false);
    // }

    const mouseDown=(e) => {
        setX(e.pageX - e.target.offsetLeft);
        setY(e.pageY - e.target.offsetTop);
        contextRef.current.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        contextRef.current.beginPath();
        setIsDrawing(true);
    }
    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        let currentX = e.pageX - e.target.offsetLeft;
        let currentY = e.pageY - e.target.offsetTop;
        let width = currentX - x;
        let height = currentY - y;
        contextRef.current.strokeRect(x, y, width, height);
        contextRef.current.clearRect(x, y, width, height);
    };
    const mouseUp=(e) => {
        // let currentX = e.pageX - e.target.offsetLeft;
        // let currentY = e.pageY - e.target.offsetTop;
        // let width = currentX - x;
        // let height = currentY - y;
        // contextRef.current.strokeRect(x, y, width, height);
        // console.log(x, y, width, height)
        // setX(null);
        // setY(null);
        // contextRef.current.closePath();
        setIsDrawing(false);
    }


    return (
        <div className="canvas">
            <canvas onMouseDown={mouseDown} onMouseMove={draw} onMouseUp={mouseUp} ref={canvasRef} width={700} height={450}/>
        </div>
    );
};

export default Canvas;