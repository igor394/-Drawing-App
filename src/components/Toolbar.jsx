import React from 'react';


const Toolbar = () => {

    return (
            <div className="toolbar">
                <button className="toolbar_btn save" />
                <button className="toolbar_btn brush" />
                <button className="toolbar_btn rect" />
                <button className="toolbar_btn circle" />
                <button className="toolbar_btn eraser" />
                <button className="toolbar_btn line" />
            </div>

    );
};

export default Toolbar;