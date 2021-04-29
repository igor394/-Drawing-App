import React, {useContext, useCallback} from 'react';
import Context from '../context/context';

const SettingBar = () => {
    const {setColor, setFont} = useContext(Context);

    const colorHandler= useCallback((e)=>{
        setColor(e.target.value)
    },[setColor])
    const fontHandler=useCallback((e)=>{
        setFont(e.target.value)
    },[setFont])

    return (
        <div>
            <div className="setting-bar">
                <label htmlFor="line-width">Line width</label>
                <input onChange={fontHandler}
                    style={{margin: '0 10px'}}
                    id="line-width"
                    type="number" defaultValue={1} min={1} max={30}/>
                <label htmlFor="stroke-color">Color &nbsp;</label>
                <input onChange={colorHandler} id="stroke-color" type="color"/>
            </div>
        </div>
    );
};

export default SettingBar;