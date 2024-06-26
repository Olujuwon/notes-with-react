import {useEffect, useState} from "react";

import {AuthProvider, AuthStatus, RequireAuth} from "./contexts/AuthContext.tsx";
import {Link, Outlet, Route, Routes} from 'react-router-dom';

import Header from "./components/Header.tsx";
import NotePage from "./pages/NotePage.tsx";
import NoteListPage from "./pages/NoteListPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {IconBrightnessDown, IconBrightnessDownFilled} from "@tabler/icons-react";
import Switch from "react-switch";

import {useCookies} from "react-cookie";

const Layout = () => {
    const [cookies, setCookies] = useCookies();
    const [checked, setChecked] =
        useState<string>(cookies['note-app-theme'] ? cookies['note-app-theme'] : 'dark');

    useEffect(() => {
        setCookies('note-app-theme', 'dark');
    }, []);

    const handleSwitchChange = (value: boolean)=>{
        setChecked(()=>value ? 'dark' : 'light');
        setCookies('note-app-theme', value ? 'dark' : 'light')
    }
    return <div className={`${checked} w-full max-w-[480px] mx-auto h-[100vh] relative bg-[color:var(--color-bg)] font-poppins`}>
        <Header title="Note Taking App">
            <Switch height={18} width={40} onChange={handleSwitchChange}
                    checked={checked === 'dark'}
                    checkedIcon={<IconBrightnessDown size={14}
                                                     className={`text-[color:var(--color-dark)] mr-1.5`}/>}
                    uncheckedIcon={<IconBrightnessDownFilled size={14}
                                                             className={`text-[color:var(--color-dark)] ml-1.5`}/>}
                    onColor={'#1f2124'}
                    offColor={'#e0e3e6'}/>
            <AuthStatus/>
        </Header>
        <Outlet/>
    </div>
}

const NotFound = ()=>{
    return <div className={`w-1/2 mx-auto pt-4`}>
        <p className={`text-[color:var(--color-dark)]`}>Page not found</p>
        <Link to={'/'} className={`text-[color:var(--color-main)] underline italic`}>Back to home</Link>
    </div>
}



const App= () => {
  return (
      <AuthProvider>
          <Routes>
              <Route element={<Layout/>}>
                  <Route path='/' element={<RegisterPage/>}/>
                  <Route path='auth' element={<LoginPage/>}/>
                  <Route path='notes' element={<RequireAuth><NoteListPage/></RequireAuth>}/>
                  <Route path='notes/:id' element={<RequireAuth><NotePage/></RequireAuth>}/>
                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
      </AuthProvider>
  )
}

export default App
