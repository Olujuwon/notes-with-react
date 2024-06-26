import React from "react";

import {Navigate, useLocation, useNavigate} from "react-router-dom";
import { useCookies, Cookies } from 'react-cookie';
import {useRegisterUserMutation, useLogoutUserMutation, useLoginInUserMutation} from "../redux/notes.ts";

import {IconLogout} from "@tabler/icons-react";

import { User} from "../appTypes.ts";

interface AuthContextType {
    user: string;
    login: (user: Partial<User>) => Promise<any>;
    register: (user: Partial<User>) => Promise<any>;
    logout: (callback: VoidFunction) => void;
}

export const cookieManager =  (function CookieManager (){
    return new Cookies()
})();

const AuthContext = React.createContext<AuthContextType>(null!);

const COOKIE_AGE: number = 86400 //24 HOURS

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [cookies, setCookies, removeCookies] = useCookies();
    const [registerUser] = useRegisterUserMutation();
    const [logoutUser] = useLogoutUserMutation();
    const [loginInUser] = useLoginInUserMutation();
    const [user, setUser] = React.useState<string>(cookies['note_user']);

    const login = async(user: Partial<User>) => {
        const loginResponse = await loginInUser({username: user.username as string, password: user.password as string});
        if (loginResponse.data){
            const {token, user} = loginResponse.data;
            setUser(()=>user);
            setCookies('note_user', user.username, {maxAge: COOKIE_AGE});
            setCookies('note_user_id', user.id, {maxAge: COOKIE_AGE});
            setCookies('note_user_token', token, {maxAge: COOKIE_AGE});
            return user;
        }else{
            return loginResponse.error;
        }
    }
    const register = async (user: Partial<User>) => {
        const registerResponse = await registerUser(user);
        if (registerResponse.data){
            const {token, user} = registerResponse.data;
            setUser(()=>user);
            setCookies('note_user', user.username, {maxAge: COOKIE_AGE});
            setCookies('note_user_id', user.id, {maxAge: COOKIE_AGE});
            setCookies('note_user_token', token, {maxAge: COOKIE_AGE});
            return user;
        }else{
           return registerResponse.error;
        }
    }
    const logout = async ( callback: VoidFunction) => {
        const logoutResponse = await logoutUser({});
        setUser(logoutResponse.data);
        removeCookies('note_user', {path: '/'});
        removeCookies('note_user_id', {path: '/'});
        removeCookies('note_user_token', {path: '/'});
        return callback();
    }
    const providerValue = {user, login, register, logout}
    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
}

export const useAuth = ()=>{
    const context = React.useContext(AuthContext);
    if (!context) throw new Error("AuthContext must be placed within AuthProvider");
    return context;
}

export const AuthStatus = ()=>{
    const auth = useAuth();
    const navigate = useNavigate();

    if(!auth.user){
        return null;
    }

    return (
        <div>
            <IconLogout
                size={18}
                onClick={()=>auth.logout(()=>navigate('/auth'))}
                className={`cursor-pointer text-[color:var(--color-dark)]`}/>
        </div>
    )
}


export const RequireAuth:React.FC<{children: JSX.Element}> =({children})=>{
    const auth = useAuth();
    const location = useLocation();
    if(!auth.user){
        return <Navigate to={'/auth/'} state={{from: location}}/>
    }
    return children;
}


