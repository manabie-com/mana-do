import React from 'react';
import './style.css'

interface Props {
    typeBtn: String;
    textBtn: String;
    styleBtn: String;
    onClick: Function;
}

Button.defaultProps = {
    typeBtn: '',
    textBtn: '',
    styleBtn: '',
    onClick: null,
}

function Button(props: Props) {
    const { typeBtn, textBtn, styleBtn, onClick } = props;

    const onHandleClick = (action: string) => {
        console.log(action);
        if (onClick == null) return false;
        console.log(action);

        onClick(action);
    }

    const showButton = () => {
        if (typeBtn === "submit") {
            return (
                <button type="submit" className="btn-custome">
                    {textBtn}
                </button>
            );
        }
        if (typeBtn === "button") {
            if (styleBtn === "primary") {
                return (
                    <button type="button" className="btn-custome">
                        {textBtn}
                    </button>
                );
            }
            if (styleBtn === "all") {
                return (
                    <button type="button" className="btn-custome btn-all" onClick={() => onHandleClick('all')}>
                        {textBtn}
                    </button>
                );
            }
            if (styleBtn === "active") {
                return (
                    <button type="button" className="btn-custome btn-active" onClick={() => onHandleClick('active')}>
                        {textBtn}
                    </button>
                );
            }
            if (styleBtn === "completed") {
                return (
                    <button type="button" className="btn-custome btn-completed" onClick={() => onHandleClick('completed')}>
                        {textBtn}
                    </button>
                );
            }
            if (styleBtn === "clear") {
                return (
                    <button type="button" className="btn-custome btn-clear" onClick={() => onHandleClick('')}>
                        {textBtn}
                    </button>
                );
            }
        }
    }

    return (
        <>
            {showButton()}
        </>
    );
}

export default Button;