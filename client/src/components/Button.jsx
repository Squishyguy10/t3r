import React from 'react';

function Button(props) {

    const c = props.color;
    const t = props.textcolor;

    return (
        <button className={`py-2 px-4 bg-${c}-600 text-${t} text-xl hover:bg-${c}-800 rounded border-2 border-${c}-400 hover:border-${c}-500`}>
            {props.children}
        </button>
    );

}

export default Button;