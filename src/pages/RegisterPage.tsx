import React, { useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";
import {User} from "../appTypes.ts";


const isEmailValid = (email : string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

const RegisterPage:React.FC<object> = () => {
    const {register} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const handleRegisterUser = async (event:React.SyntheticEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const user = await register({email:email, password:password, username:username}) as Partial<User>;
        if (user.username){
            navigate("/notes");
        }else {
            alert("An unexpected error occurred,Please try again");
        }
    }

    const handleEmailFieldChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const emailValue: string = event.currentTarget.value;
        setEmail(emailValue);
        if (!isEmailValid(emailValue)) {
            setError('Invalid email format.');
        } else {
            setError('');
        }
    }

    const isDisabled = username.length === 0 || email.length === 0 || password.length === 0;

    return(
        <>
            <form className={`flex flex-col gap-y-3 place-content-center justify-center py-[50%]`} onSubmit={handleRegisterUser}>
                <input placeholder='Username' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                       onChange={(event)=>setUsername(event.currentTarget.value)}
                       value={username}/>
                <input placeholder='Email' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                       onChange={handleEmailFieldChange}
                       value={email}/>
                {error && <p className={`w-3/4 mx-auto pl-2 text-[color:var(--color-dark)]`}>{error}</p>}
                <input placeholder='Password' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                       onChange={(event)=> setPassword(event.currentTarget.value)}
                       value={password} type="password"/>
                <button
                    className={`h-10 w-3/4 mx-auto text-[color:var(--color-white)] 
                    ${isDisabled ? 'bg-[color:var(--color-disabled)]' : 'bg-[color:var(--color-main)]'}`}
                    type='submit'
                    disabled={isDisabled}
                >Register
                </button>
                <Link className={`mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)]`} to='/auth'>Already registered? Login here</Link>
            </form>
        </>
    )
}

export default RegisterPage;