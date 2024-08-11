import { useEffect, useState } from "react"
import { useDQDispatch, useDQSelector } from "../../redux/hooks"
import { setHeader } from "../../redux/header/headerSlice"
import Lottie from "lottie-react"
import SuccessAnimation from "../../assets/Success.json"
import ErrorAnimation from "../../assets/Error.json"
import LoadingAnimation from "../../assets/Loading.json"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { ALREADY_VERIFIED, APIURL, AccVerifiedText, AlreadyVerifiedText, TOKEN_NOT_FOUND, TokenNotFoundText, USER_NOT_FOUND, User404Token, VERIFIED_SUCCESS } from "../../constants"
import { verifyUser } from "../../redux/user/userSlice"
import toast, { Toaster } from "react-hot-toast"

export default function VerifyEmail() {

  const userData = useDQSelector(state => state.user)
  const dispatch = useDQDispatch()
  const location = useLocation()
  const [token, setToken] = useState("")
  const [verificationState, setVerificationState] = useState("")
  const [done, setDone] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const navigate = useNavigate()

  const sendVerificationRequest = async () => {
    if(token){
      await axios.get(`${APIURL}/api/account/verify-email?token=${token}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(response => {

        setVerificationState(response.data.server)
        if(userData.currentUser === null){

          toast.error('Your account has been verified but it seems you might need to login again.', {
            style: {
              border: '1px solid #f43f5e',
              padding: '16px',
              color: '#FFFFFF',
              backgroundColor: '#0c0d0c'
            },
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#FFFAEE',
            },
          })
          
          setTimeout(() => {
              navigate("/")
          }, 5000)
        }
        dispatch(verifyUser(true))
        setDone(true)

      }).catch(err => {

        if(err.response === undefined){
          setVerificationState("ERROR_OCCURED")
        }
        else{
          setVerificationState(err.response.data.message)
        }
        setDone(true)

      })
    }
  }

  useEffect(() => {
    dispatch(setHeader(false))

    try{
      if(userData.currentUser?.verified){
        const interval = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1)
        }, 1000)
      
        setTimeout(() => {
            navigate("/profile")
        }, 3000)

        return () => clearInterval(interval)
      }
      else{
        const queryParams = new URLSearchParams(location.search)
        const veriToken = queryParams.get('token')
        if(!veriToken){
          setVerificationState(TOKEN_NOT_FOUND)
          setDone(true)
        }
        else{
          setToken(veriToken)
          sendVerificationRequest()
        }
      }
    }
    catch(err){
      setVerificationState("ERROR_OCCURED")
    }
  }, [token, userData.currentUser?.verified])

  const renderAnimation = () => {
    if(token){
      if(done){
        switch(verificationState){
          case VERIFIED_SUCCESS:
            return (
              <>
              <Lottie animationData={SuccessAnimation} loop={false} style={{ width: 300, height: 300 }}/>
              <span className="mt-10 usedbquotes text-wrap tracking-widest text-xl">{AccVerifiedText}</span>
              <span className="mt-10 usedbquotes text-wrap tracking-widest text-xl">Redirecting to profile in {countdown} seconds.</span>
              </>
            )
          case ALREADY_VERIFIED:
            return (
              <>
              <Lottie animationData={SuccessAnimation} loop={false} style={{ width: 300, height: 300 }}/>
              <span className="mt-10 usedbquotes text-wrap tracking-widest text-xl">{AlreadyVerifiedText}</span>
              <span className="mt-10 usedbquotes text-wrap tracking-widest text-xl">Redirecting to profile in {countdown} seconds.</span>
              </>
            )
          case USER_NOT_FOUND:
            return (
              <>
              <Lottie animationData={ErrorAnimation} loop={false} style={{ width: 300, height: 300 }}/>
              <span className="mt-10 usedbquotes tracking-widest text-2xl">{User404Token}</span>
              </>
            )
          case TOKEN_NOT_FOUND:
            return (
              <>
              <Lottie animationData={ErrorAnimation} loop={false} style={{ width: 300, height: 300 }}/>
              <span className="mt-10 usedbquotes tracking-widest text-2xl">{TokenNotFoundText}</span>
              </>
            )
          default:
            return (
              <>
              <Toaster/>
              <Lottie animationData={ErrorAnimation} loop={false} style={{ width: 300, height: 300 }}/>
              <span className="mt-10 usedbquotes tracking-widest text-2xl">Something went wrong!</span>
              </>
            )
        }
      }
      else{
        return (
          <>
          <Lottie animationData={LoadingAnimation} loop={true} style={{ width: 300, height: 300 }}/>
          <span className="mt-10 usedbquotes tracking-widest text-2xl">Verifying account! Please wait...</span>
          </>
        )
      }
    }
    else{
      return (
        <>
        <Lottie animationData={ErrorAnimation} loop={false} style={{ width: 300, height: 300 }}/>
        <span className="mt-10 usedbquotes tracking-widest text-2xl">A verification token was not found!</span>
        </>
      )
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-[#0c0d0c]">
        <div className="flex flex-col justify-center items-center w-[700px] h-[700px] bg-[#0f100f]">
          {renderAnimation()}
        </div>
    </div>
  )
}
