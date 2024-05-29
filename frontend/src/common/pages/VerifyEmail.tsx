import { useEffect, useState } from "react"
import { useDQDispatch } from "../../redux/hooks"
import { setHeader } from "../../redux/header/headerSlice"
import Lottie from "lottie-react"
import SuccessAnimation from "../../assets/Success.json"
import ErrorAnimation from "../../assets/Error.json"
import LoadingAnimation from "../../assets/Loading.json"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { ALREADY_VERIFIED, APIURL, AccVerifiedText, AlreadyVerifiedText, TOKEN_NOT_FOUND, TokenNotFoundText, USER_NOT_FOUND, User404Token, VERIFIED_SUCCESS } from "../../constants"

export default function VerifyEmail() {

  const dispatch = useDQDispatch()
  const location = useLocation()
  const [token, setToken] = useState("")
  const [verificationState, setVerificationState] = useState("")
  const [done, setDone] = useState(false)

  const sendVerificationRequest = async () => {
    if(token){
      await axios.get(`${APIURL}/api/verify-email?token=${token}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(response => {

        setVerificationState(response.data.server)
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
    catch(err){
      setVerificationState("ERROR_OCCURED")
    }
  }, [token])

  const renderAnimation = () => {
    if(token){
      if(done){
        switch(verificationState){
          case VERIFIED_SUCCESS:
            return (
              <>
              <Lottie animationData={SuccessAnimation} loop={false} style={{ width: 300, height: 300 }}/>
              <span className="mt-10 usedbquotes tracking-widest text-2xl">{AccVerifiedText}</span>
              </>
            )
          case ALREADY_VERIFIED:
            return (
              <>
              <Lottie animationData={SuccessAnimation} loop={false} style={{ width: 300, height: 300 }}/>
              <span className="mt-10 usedbquotes tracking-widest text-2xl">{AlreadyVerifiedText}</span>
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
