import React from "react";

export default function Button({ Text="nil", onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="px-3 py-1 text-sm rounded bg-blue-300 text-white"
        >
            {Text}
        </button>
    );
}