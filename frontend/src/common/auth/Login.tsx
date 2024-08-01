import { FormEvent, useEffect, useState } from "react";
import Doodle from "./Doodle";
import { CheckFat, Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Tooltip } from 'react-tooltip'
import { APIURL, NOT_AN_EMAIL, EMAIL_ALREADY_EXISTS, TEMP_MAIL_DETECTED, INVALID_USERNAME_FORMAT, UNAME_ALREADY_EXISTS,
  PW_CRITERIA_FAILURE, PW_LENGTH_INVALID,
  NotAnEmailText,
  AccEmailAlreadyExists,
  DisposableMailsNotAllowed,
  InvalidUnameText,
  AccUnameAlreadyExists,
  PassCriteriaFailureText,
  PassLengthFailureText,
  USER_NOT_FOUND,
  InvalidPassText,
  UserNotFoundText,
  INVALID_PASSWORD
} from "../../constants";
import PopupBox from "../../components/modals/PopupBox";
import { useDQDispatch } from "../../redux/hooks";
import { login } from "../../redux/user/userSlice";

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
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [passwordTooltip, setPassTooltip] = useState("")

  const [signupProcess, setSignupProcess] = useState({start: false, success: false, done: false, signupres: ""})
  const [loginProcess, setLoginProcess] = useState({start: false, success: false, done: false, loginres: ""})

  const dispatch = useDQDispatch()
  const navigate = useNavigate()

  const renderSignupProgress = () => {
    if(signupProcess.done){
      if(signupProcess.success){
        return <PopupBox type="success" message="Account created successfully!"/>
      }
      else{
        switch(signupProcess.signupres){
          case NOT_AN_EMAIL:
            return <PopupBox type="error" message="Account creation failed!" moreinfo={NotAnEmailText} closebt setSignupProcess={setSignupProcess}/>
          case EMAIL_ALREADY_EXISTS:
            return <PopupBox type="error" message="Account creation failed!" moreinfo={AccEmailAlreadyExists} closebt setSignupProcess={setSignupProcess}/>
          case TEMP_MAIL_DETECTED:
            return <PopupBox type="error" message="Account creation failed!" moreinfo={DisposableMailsNotAllowed} closebt setSignupProcess={setSignupProcess}/>
          case INVALID_USERNAME_FORMAT:
            return <PopupBox type="error" message="Account creation failed!" moreinfo={InvalidUnameText} closebt setSignupProcess={setSignupProcess}/>
          case UNAME_ALREADY_EXISTS:
            return <PopupBox type="error" message="Account creation failed!" moreinfo={AccUnameAlreadyExists} closebt setSignupProcess={setSignupProcess}/>
          case PW_CRITERIA_FAILURE:
            return <PopupBox type="error" message="Account creation failed!" moreinfo={PassCriteriaFailureText} closebt setSignupProcess={setSignupProcess}/>
          case PW_LENGTH_INVALID:
            return <PopupBox type="error" message="Account creation failed!" moreinfo={PassLengthFailureText} closebt setSignupProcess={setSignupProcess}/>
          default:
            return <PopupBox type="error" message="Account creation failed!" moreinfo="Something went wrong or invalid format found" closebt setSignupProcess={setSignupProcess}/>
        }
      }
    }
    else{
      return <PopupBox type="loading"/>
    }
  }

  const renderLoginProgress = () => {
    if(loginProcess.done){
      if(loginProcess.success){
        return <PopupBox type="loading" message="Logged in successfully. Redirecting..."/>
      }
      else{
        switch(loginProcess.loginres){
          case USER_NOT_FOUND:
            return <PopupBox type="error" message="Login failed!" moreinfo={UserNotFoundText} closebt setLoginProcess={setLoginProcess}/>
          case INVALID_PASSWORD:
            return <PopupBox type="error" message="Login failed!" moreinfo={InvalidPassText} closebt setLoginProcess={setLoginProcess}/>
          default:
            return <PopupBox type="error" message="Login failed!" moreinfo="Something went wrong or invalid format found" closebt setLoginProcess={setLoginProcess}/>
        }
      }
    }
    else{
      return <PopupBox type="loading"/>
    }
  }

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
      if(res === NOT_AN_EMAIL){
        setEmailTooltip(NotAnEmailText)
      }
      else if(res === EMAIL_ALREADY_EXISTS){
        setEmailTooltip(AccEmailAlreadyExists)
      }
      else if(res === TEMP_MAIL_DETECTED){
        setEmailTooltip(DisposableMailsNotAllowed)
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
      if(res === INVALID_USERNAME_FORMAT){
        setUnameTooltip(InvalidUnameText)
      }
      else if(res === UNAME_ALREADY_EXISTS){
        setUnameTooltip(AccUnameAlreadyExists)
      }
      else{
        setUnameTooltip("Invalid format!")
      }
    })
  }

  const validatePassword = async() => {
    const passAPI = `${API}/checkpassword`

    await axios.post(passAPI, {
      password: signupDetails.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response)
      setInvalidPassword(false)

      if(response.data.res === "VALID_PASSWORD"){
        setPassTooltip("Entered password satisfies best practices")
      }

    }).catch(err => {
      console.log(err)
      setInvalidPassword(true)

      const res: string = err.response.data.res
      if(res === PW_CRITERIA_FAILURE){
        setPassTooltip(PassCriteriaFailureText)
      }
      else if(res === PW_LENGTH_INVALID){
        setPassTooltip(PassLengthFailureText)
      }
      else{
        setPassTooltip("Invalid format!")
      }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("called: isLOGIN: ", isLogin)
    if (isLogin) {
      setLoginProcess({
        ...loginProcess,
        start: true
      })
        await axios.post(`${API}/login`, {
            identifier: loginDetails.id,
            password: loginDetails.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
          setLoginProcess({
            ...loginProcess,
            start: true,
            success: true,
            done: true
          })
            dispatch(login(res.data))
        })
        .catch(err => {
          setLoginProcess({
            ...loginProcess,
            start: true,
            success: false,
            done: true,
            loginres: err.response.data.message
          })
            
        })
    } else {
        setSignupProcess({
            ...signupProcess,
            start: true
        })
        await axios.post(`${API}/signup`, {
            uname: signupDetails.uname,
            email: signupDetails.email,
            password: signupDetails.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            setSignupProcess({
                ...signupProcess,
                start: true,
                success: true,
                done: true,
            })
            dispatch(login(res.data))
            navigate("/pending-verification")
        })
        .catch(err => {
            setSignupProcess({
                ...signupProcess,
                start: true,
                success: false,
                done: true,
                signupres: err.response.data.res
            })
            
        })
    }
  }

  return (
    <div className="flex min-w-screen min-h-screen justify-center items-center">
      {signupProcess.start && (
        renderSignupProgress()
      )}
      {loginProcess.start && (
        renderLoginProgress()
      )}
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
          {isLogin ? (<input value={loginDetails.id} onChange={(e) => {setLoginDetails({...loginDetails, id: e.target.value})}} type="text" className="mt-5 ms-5 me-5 p-4 ps-5 pe-5 rounded-3xl outline-0 focus-visible:outline-none focus-visible:border-none bg-[#3e4535]/25 text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 focus:bg-[#3e4535]/50" placeholder="Email or username *" required/>)
           : (
            <>
            <div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${emailFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
              <input value={signupDetails.email} onChange={(e) => {setSignupDetails({...signupDetails, email: e.target.value})}} type="text" className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0 focus-visible:outline-none focus-visible:border-none" placeholder="Email *" required onFocus={() => setEmailFocused(!emailFocused)} onBlur={() => {setEmailFocused(!emailFocused); checkMailExists()}}/>
              {signupDetails.email && (
                !emailExists ? (<><CheckFat size={16} weight="fill" className="me-5 text-[#A9A74F]" data-tooltip-id="emailTooltip" data-tooltip-content={emailTooltip}/>
                <Tooltip id="emailTooltip" style={{backgroundColor: "rgb(169, 167, 79)"}}/></>)
               : (<><WarningCircle size={24} weight="fill" className="me-5 text-rose-500" data-tooltip-id="emailTooltip" data-tooltip-content={emailTooltip}/>
               <Tooltip id="emailTooltip" style={{backgroundColor: "rgb(159, 18, 57)"}}/></>)
               )}
            </div>
            <div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${unameFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
              <input value={signupDetails.uname} onChange={(e) => {setSignupDetails({...signupDetails, uname: e.target.value})}} type="text" className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0 focus-visible:outline-none focus-visible:border-none" placeholder="Username *" required onFocus={() => setUnameFocused(!unameFocused)} onBlur={() => {setUnameFocused(!unameFocused); checkUnameExists()}}/>
              {signupDetails.uname && (
                !unameExists ? (<><CheckFat size={16} weight="fill" className="me-5 text-[#A9A74F]" data-tooltip-id="unameTooltip" data-tooltip-content={unameTooltip}/>
                <Tooltip id="unameTooltip" style={{backgroundColor: "rgb(169, 167, 79)"}}/></>)
               : (<><WarningCircle size={24} weight="fill" className="me-5 text-rose-500" data-tooltip-id="unameTooltip" data-tooltip-content={unameTooltip}/>
               <Tooltip id="unameTooltip" style={{backgroundColor: "rgb(159, 18, 57)"}}/></>)
               )}
            </div>
            <div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${passFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
              <input value={signupDetails.password} onChange={(e) => {setSignupDetails({...signupDetails, password: e.target.value})}} type={passHidden ? "password" : "text"} className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0 focus-visible:outline-none focus-visible:border-none" placeholder="Password *" required onFocus={() => setPassFocused(!passFocused)} onBlur={() => {setPassFocused(!passFocused); validatePassword()}}/>
              {passHidden ? <EyeSlash size={24} onClick={() => setPassHidden(!passHidden)} className="me-5"/> :
              <Eye size={24} onClick={() => setPassHidden(!passHidden)} className="me-5"/>}
              {signupDetails.password && (
                !invalidPassword ? (<><CheckFat size={16} weight="fill" className="me-5 text-[#A9A74F]" data-tooltip-id="passTooltip" data-tooltip-content={passwordTooltip}/>
                <Tooltip id="passTooltip" style={{backgroundColor: "rgb(169, 167, 79)"}}/></>)
               : (<><WarningCircle size={24} weight="fill" className="me-5 text-rose-500" data-tooltip-id="passTooltip" data-tooltip-content={passwordTooltip}/>
               <Tooltip id="passTooltip" style={{backgroundColor: "rgb(159, 18, 57)"}}/></>)
               )}
            </div>
            </>
           )}
          
          {isLogin && (<div className={`flex mt-5 ms-5 me-5 rounded-3xl items-center  text-gray-400 placeholder-gray-400 hover:bg-[#3e4535]/50 ${passFocused ? "bg-[#3e4535]/50" : "bg-[#3e4535]/25"}`}>
            <input value={loginDetails.password} onChange={(e) => {setLoginDetails({...loginDetails, password: e.target.value})}} type={passHidden ? "password" : "text"} className="bg-transparent w-full h-full p-4 ps-5 pe-5 outline-0 border-0 focus-visible:outline-none focus-visible:border-none" placeholder="Password *" required onFocus={() => setPassFocused(!passFocused)} onBlur={() => setPassFocused(!passFocused)}/>
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