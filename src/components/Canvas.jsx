import React, {useEffect, useRef, useState, useContext, useCallback} from 'react';
import Context from '../context/context';

const Canvas = () => {
    const {color, font, canvas, setCanvas, context, setContext, tool} = useContext(Context);
    const canvasRef = useRef();
    const [isDrawing, setIsDrawing] = useState(false)
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [savedUrl, setSavedUrl] = useState(null)


    useEffect(() => {
        setCanvas(canvasRef.current);
       const ctx = canvasRef.current.getContext('2d');
        setContext(ctx)
        if(tool==='eraser') ctx.strokeStyle = '#fff';
        else ctx.strokeStyle = color;
        ctx.lineWidth = font;

    }, [color, font, setCanvas, context, setContext, tool])


    const mouseDown=useCallback((e) => {
        let EX = e.pageX - e.target.offsetLeft;
        let EY = e.pageY - e.target.offsetTop;
        setIsDrawing(true);
        context.beginPath();
        let canvasData =canvas.toDataURL()
        switch (tool) {
            case 'brush':
                context.moveTo(EX, EY);
                break;
            case 'rect':
                setX(EX);
                setY(EY);
                setSavedUrl(canvasData)
                break;
            case 'circle':
                setX(EX);
                setY(EY);
                setSavedUrl(canvasData)
                break;
            case 'eraser':
                context.moveTo(EX, EY);
                break;
            case 'line':
                setX(EX);
                setY(EY);
                context.moveTo(EX, EY);
                setSavedUrl(canvasData);
                break;
            default:
                alert('not found');
        }
    },[context, canvas, tool])


    const draw = useCallback((e) => {
        if (!isDrawing) {
            return;
        }
        let EX = e.pageX - e.target.offsetLeft;
        let EY = e.pageY - e.target.offsetTop;
        let width = EX - x;
        let height = EY - y;
        const img = new Image()
        img.src = savedUrl
        switch (tool) {
            case 'brush':
                context.lineTo(EX, EY);
                context.stroke();
                break;
            case 'rect':
                img.onload = () => {
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    context.drawImage(img, 0, 0, canvas.width, canvas.height)
                    context.beginPath()
                    context.strokeRect(x, y, width, height)
                }
                break;
            case 'circle':
                let r = Math.sqrt(width**2 + height**2)
                img.onload = async function () {
                    context.clearRect(0,0, canvas.width, canvas.height)
                    context.drawImage(img, 0, 0, canvas.width, canvas.height)
                    context.beginPath()
                    context.arc(x, y, r, 0, 2*Math.PI)
                    // context.fill()
                    context.stroke()
                }
                break;
            case 'eraser':
                context.lineTo(EX, EY);
                context.stroke();
                break;
            case 'line':
                img.onload = async function () {
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    context.drawImage(img, 0, 0, canvas.width, canvas.height)
                    context.beginPath()
                    context.moveTo(EX, EY)
                    context.lineTo(x, y)
                    context.stroke()
                }
                break;
            default:
                alert('not found');
        }

    },[context, canvas, isDrawing, savedUrl, tool, x, y]);


    const mouseUp= useCallback(() => {
        context.closePath();
        setIsDrawing(false);
    },[context])


    return (
        <div className="canvas">
            <canvas onMouseDown={mouseDown} onMouseMove={draw} onMouseUp={mouseUp} ref={canvasRef} width={700}
                    height={450}/>
        </div>
    );
};

export default Canvas;