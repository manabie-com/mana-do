import React from "react";

const Button = ({ setShowing, type, children }: any) => {
    return <button className="Action__btn" onClick={() => setShowing(type)}>
        {children}
</button>
}

export default Button;