import { useState, createContext, useContext, useEffect } from "react";
import Cookie from "js-cookie"
import axios from "../api/axios";


export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  //HOOKS
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading,setLoading] = useState(false)

  //LOGIN
  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data);
        console.log(res.data);
        setUser(res.data);
        setIsAuth(true);
      return res.data;

    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  //REGISTRARSE
  const signup = async (data) => {
   try {
     const res = await axios.post("/signup", data);
      setIsAuth(true)
      setUser(res.data);

    return res.data

   } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  //SIGNOUT
    const signout = async() => {
      const res = await axios.post("/signout")
      setUser(null)
      setIsAuth(false)

      return res.data
    }

    useEffect(()=>{
      setLoading(true)
      if(Cookie.get("token")){
        axios.get("/profile").then((res)=>{
          setUser(res.data)
          setIsAuth(true)
          setLoading(false)
        }).catch((error)=>{
          setUser(null)
          setIsAuth(false)
          console.log(error)
          setLoading(false)
        })
      }
      setLoading(false)
    }, [])

    useEffect(()=>{
      const timeout = setTimeout(()=>{
        setErrors(null)
      },3000);
      return () =>{
        clearTimeout(timeout)
      }
    },[errors])

  return (
    <AuthContext.Provider
      value={{ user, isAuth, errors, signup, setUser, signin,signout,loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
