import React from "react";
import './AppTitle.css';

function AppTitle() {
    return (
        <div className="app-title">
            <span className="app-title-text"><span style={{backgroundColor: "#39a1f4", color:"white", paddingLeft: 10, paddingRight: 10}}>Todo</span> App</span>
        </div>
    )
}

export default AppTitle;