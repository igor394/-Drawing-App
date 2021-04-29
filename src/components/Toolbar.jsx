import React, {useCallback, useContext} from 'react';
import Context from '../context/context';


const Toolbar = () => {
    const {setTool, context, canvas} = useContext(Context);
    const remove=()=>{
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
    const download = () => {
        const dataUrl = canvas.toDataURL()
        const a = document.createElement('a')
        a.style.backgroundColor = '#fff'
        a.href = dataUrl

        //save png
        a.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));

        //save jpeg
        // a.setAttribute('href', canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"));
        a.click();
    }
    const  handlerTool= useCallback((params) => ()=>{
        setTool(params)
    },[setTool])


    return (
            <div className="toolbar">
                <button className="toolbar_btn save" onClick={download}/>
                <button className="toolbar_btn cross"  onClick={remove}/>
                <button className="toolbar_btn brush" onClick={handlerTool('brush')}/>
                <button className="toolbar_btn rect" onClick={handlerTool('rect')}/>
                <button className="toolbar_btn circle" onClick={handlerTool('circle')}/>
                <button className="toolbar_btn eraser" onClick={handlerTool('eraser')}/>
                <button className="toolbar_btn line" onClick={handlerTool('line')}/>
            </div>

    );
};

export default Toolbar;