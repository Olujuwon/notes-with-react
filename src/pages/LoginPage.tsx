import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

const LoginPage:React.FC<object> = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginUser = async (event:React.SyntheticEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const user = await login({username: username, password: password});
        if (user.username)navigate('/notes')
        else alert("An unexpected error occurred,Please try again");
    }

    const isDisabled = username.length === 0 || password.length === 0;

    return(
        <form className={`flex flex-col gap-y-3 place-content-center justify-center py-[50%]`}
              onSubmit={handleLoginUser}>
            <input placeholder='Username' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                   onChange={(event) => setUsername(event.currentTarget.value)}
                   value={username}
            />
            <input placeholder='Password' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                   onChange={(event) => setPassword(event.currentTarget.value)}
                   value={password} type="password"
            />
            <button
                type='submit'
                disabled={isDisabled}
                className={`h-10 w-3/4 mx-auto text-[color:var(--color-white)] 
                ${isDisabled ? 'bg-[color:var(--color-disabled)]' : 'bg-[color:var(--color-main)]'}`}>
                Login
            </button>
            <Link className={`mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)]`} to='/auth/register'>Not
                registered? Register here</Link>
            <p className='mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)] text-xs font-light'>Powered by
                React.js</p>
        </form>
    )
}

export default LoginPage;