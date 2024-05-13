import { FormEvent, useEffect, useState } from "react";
import Doodle from "./Doodle";
import { CheckFat, Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tooltip } from 'react-tooltip'
import { APIURL } from "../../constants";

export default function Login() {

  const [isLogin, setIsLogin] = useState(true)
  const [passHidden, setPassHidden] = useState(true)
  const [passFocused, setPassFocused] = useState(false)
  const [loginDetails, setLoginDetails] = useState({id: "", password: ""})

  const [emailFocused, setEmailFocused] = useState(false)
  const [unameFocused, setUnameFocused] = useState(false)
  const [signupDetails, setSignupDetails] = useState({email: "", uname: "", password: ""})

  const [emailExists, setEmailExists] = useState(false)
  const [emailTooltip, setEmailTooltip] = useState("")
  const [unameExists, setUnameExists] = useState(false)
  const [unameTooltip, setUnameTooltip] = useState("")

  const API = `${APIURL}/api/auth`

  const handleGoogleSigninResponse = (response: any) => {
    console.log("Encoded JWT:", response.credential)
  }

  const initGoogleSignIn = () => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GAUTH_CLIENT_ID,
      callback: handleGoogleSigninResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('gSignInDiv')!,
      {
        theme: "outline", text: "continue_with", size: "large", shape: "circle", width: 350, type: "standard"
      }
    )
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    initGoogleSignIn()
    const genDoodleID = setInterval(genDoodle, 5000)

    return () => {
      document.body.style.overflow = 'unset';
      clearInterval(genDoodleID)
    };
  }, []); 

  const genDoodle = () => {
    document.querySelectorAll('css-doodle').forEach(function (o: any) {o.update()})
  }

  const checkMailExists = async () => {
    const mailAPI = `${API}/checkemail`
    await axios.post(mailAPI, {
      email: signupDetails.email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response)
      setEmailExists(false)

      if(response.data.res === "NEW_VALID_EMAIL"){
        setEmailTooltip("Entered email is valid")
      }
    })
    .catch(err => {
      console.log(err)
      setEmailExists(true)

      const res: string = err.response.data.res
      if(res === "NOT_AN_EMAIL"){
        setEmailTooltip("Invalid email format.")
      }
      else if(res === "EMAIL_ALREADY_EXISTS"){
        setEmailTooltip("An account with this email already exists.")
      }
      else if(res === "TEMP_MAIL_DETECTED"){
        setEmailTooltip("Disposable emails are not allowed!")
      }
      else{
        setEmailTooltip("Invalid format!")
      }
    })
  }

  const checkUnameExists = async () => {
    const unameAPI = `${API}/checkuname`
    await axios.post(unameAPI, {
      uname: signupDetails.uname
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response)
      setUnameExists(false)

      if(response.data.res === "NEW_VALID_USERNAME"){
        setUnameTooltip("Entered username is valid.")
      }
    })
    .catch(err => {
      console.log(err)
      setUnameExists(true)

      const res: string = err.response.data.res
      if(res === "INVALID_USERNAME_FORMAT"){
        setUnameTooltip("Usernames can only contain letters, numbers, underscores, dashes and dots. Usernames should be 3-20 characters in length.")
      }
      else if(res === "UNAME_ALREADY_EXISTS"){
        setUnameTooltip("An account with this username already exists.")
      }
      else{
        setUnameTooltip("Invalid format!")
      }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(isLogin){
      await axios.post(`${API}/login`, {
        identifer: loginDetails.id,
        password: loginDetails.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log("Login success")
      }).catch(err => {
        console.log("Signup failed")
      })
    }
    else{
      await axios.post(`${API}/signup`, {
        uname: signupDetails.uname,
        email: signupDetails.email,
        password: signupDetails.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log("Signup success")
      }).catch(err => {
        console.log("Signup failed")
      })
    }
    console.log("form event handled")
  }

  return (
    <div className="flex min-w-screen min-h-screen justify-center items-center">
      <div className="flex w-full h-full select-none">
        <Doodle/>
      </div>
      <form onSubmit={handleSubmit} className="absolute flex flex-col w-[530px] h-[644px] bg-[#1a1e15] rounded-2xl useinter p-10">
          <span className="text-2xl font-extrabold">{isLogin ? "Log In" : "Sign Up"}</span>
          <span className="mt-2 text-xs text-gray-300">By continuing, you can use Double Quotes to its full extent. Your data is not used for any other purposes as this is a hobby project.</span>
          <div id="gSignInDiv" className={`mt-3 ${!isLogin && "pb-1"} rounded-full overflow-hidden self-center`}></div>
          <div className="flex mt-5 justify-center items-center">
            <div className='flex border-0 h-[1px] w-full bg-[#3e4535] me-2'></div>
            <span className="text-[#6a765b] text-sm">OR</span>
            <div className='flex border-0 h-[1px] w-full bg-[#3e4535] ms-2'></div>
          </div>
          {isLogin ? (<input value={loginDetails.id} onChange={(e) => {setLoginDetails({...loginDetails, id: e.target.value})}} type="text" className="mt-5 ms-5 me-5 p-4 ps-5 pe-5 rounded-3xl outline-0 bg-[#3e4535]/25 text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 focus:bg-[#3e4535]/50" placeholder="Email or username *" required/>)
           : (
            <>
            <div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${emailFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
              <input value={signupDetails.email} onChange={(e) => {setSignupDetails({...signupDetails, email: e.target.value})}} type="text" className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0" placeholder="Email *" required onFocus={() => setEmailFocused(!emailFocused)} onBlur={() => {setEmailFocused(!emailFocused); checkMailExists()}}/>
              {signupDetails.email && (
                !emailExists ? (<><CheckFat size={16} weight="fill" className="me-5 text-[#A9A74F]" data-tooltip-id="emailTooltip" data-tooltip-content={emailTooltip}/>
                <Tooltip id="emailTooltip" style={{backgroundColor: "rgb(169, 167, 79)"}}/></>)
               : (<><WarningCircle size={24} weight="fill" className="me-5 text-rose-500" data-tooltip-id="emailTooltip" data-tooltip-content={emailTooltip}/>
               <Tooltip id="emailTooltip" style={{backgroundColor: "rgb(159, 18, 57)"}}/></>)
               )}
            </div>
            <div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${unameFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
              <input value={signupDetails.uname} onChange={(e) => {setSignupDetails({...signupDetails, uname: e.target.value})}} type="text" className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0" placeholder="Username *" required onFocus={() => setUnameFocused(!unameFocused)} onBlur={() => {setUnameFocused(!unameFocused); checkUnameExists()}}/>
              {signupDetails.uname && (
                !unameExists ? (<><CheckFat size={16} weight="fill" className="me-5 text-[#A9A74F]" data-tooltip-id="unameTooltip" data-tooltip-content={unameTooltip}/>
                <Tooltip id="unameTooltip" style={{backgroundColor: "rgb(169, 167, 79)"}}/></>)
               : (<><WarningCircle size={24} weight="fill" className="me-5 text-rose-500" data-tooltip-id="unameTooltip" data-tooltip-content={unameTooltip}/>
               <Tooltip id="unameTooltip" style={{backgroundColor: "rgb(159, 18, 57)"}}/></>)
               )}
            </div>
            <div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${passFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
              <input value={signupDetails.password} onChange={(e) => {setSignupDetails({...signupDetails, password: e.target.value})}} type={passHidden ? "password" : "text"} className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0" placeholder="Password *" required onFocus={() => setPassFocused(!passFocused)} onBlur={() => setPassFocused(!passFocused)}/>
              {passHidden ? <EyeSlash size={24} onClick={() => setPassHidden(!passHidden)} className="me-5"/> :
              <Eye size={24} onClick={() => setPassHidden(!passHidden)} className="me-5"/>}
            </div>
            </>
           )}
          
          {isLogin && (<div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${passFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
            <input value={loginDetails.password} onChange={(e) => {setLoginDetails({...loginDetails, password: e.target.value})}} type={passHidden ? "password" : "text"} className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0" placeholder="Password *" required onFocus={() => setPassFocused(!passFocused)} onBlur={() => setPassFocused(!passFocused)}/>
            {passHidden ? <EyeSlash size={24} onClick={() => setPassHidden(!passHidden)} className="me-5"/> : 
              <Eye size={24} onClick={() => setPassHidden(!passHidden)} className="me-5"/>}
          </div>)}
          {isLogin && <Link to={"/forgotpass"} className="mt-5 ms-5 text-sm text-[#A9A74F] w-[120px]">Forgot Password?</Link>}
          <span className="mt-5 ms-5 text-sm">{isLogin ? "New to DoubleQuotes?" : "Already have an account?" }&nbsp;<span className="text-[#A9A74F] cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Login"}</span></span>
          <div className="flex flex-col h-40 justify-end">
          {isLogin ? (
            <button disabled={loginDetails.id === "" || loginDetails.password === ""} className={`mt-2 p-3 ps-7 pe-7 rounded-full font-semibold ${loginDetails.id !== "" && loginDetails.password !== "" ? "bg-[#A9A74F] hover:bg-[#A9A74F]/75" : "bg-[#3e4535]/10 text-[#3e4535]/45 cursor-default"}`}>Login</button>
          ) : (
            <button disabled={signupDetails.email === "" || signupDetails.uname === "" || signupDetails.password === ""} className={`mt-2 p-3 ps-7 pe-7 rounded-full font-semibold ${signupDetails.email !== "" && signupDetails.uname !== "" && signupDetails.password !== "" ? "bg-[#A9A74F] hover:bg-[#A9A74F]/75" : "bg-[#3e4535]/10 text-[#3e4535]/45 cursor-default"}`}>Sign Up</button>
          )}
          </div>
      </form>
    </div>
  );
}