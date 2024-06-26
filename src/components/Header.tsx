import React from "react";

interface HeaderProps {
    title: string;
    children?: JSX.Element[];
}

const Header: React.FC<HeaderProps> = ({title, children})=>{
    return(
        <div className={`flex items-center p-4 justify-between bg-[color:var(--color-lighter)] align-middle`}>
            <h1 className={`text-3xl font-extrabold text-center text-[color:var(--color-dark)]`}>{title}</h1>
            <span className={`flex gap-x-4`}>{children}</span>
        </div>
    )
}

export default Header;