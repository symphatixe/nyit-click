"use client";
import React, { useState } from "react";

const WelcomeHeader: React.FC = () => {
    const [username, setUsername] = useState("Helen");

    return(
        <div>
            <h1 className="text-6xl font-bold text-[#002D72]">
            WELCOME <br /> {username.toUpperCase()}
            </h1>
        </div>
    );
};
export default WelcomeHeader;
