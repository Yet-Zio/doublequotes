import { useEffect, useState } from "react"
import { useDQDispatch, useDQSelector } from "../../redux/hooks"
import { setHeader } from "../../redux/header/headerSlice"
import { Link, useNavigate } from "react-router-dom"
import { Quotes } from "@phosphor-icons/react"
import Lottie from "lottie-react"
import SuccessAnimation from "../../assets/Success.json"
import { APIURL } from "../../constants"
import axios from "axios"

export default function Verification() {

    const dispatch = useDQDispatch()
    const userData = useDQSelector(state => state.user)
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(5)

    const resendEmail = async () => {
        await axios.post(`${APIURL}/api/account/resend-ver-email`, {
            email: userData.currentUser?.email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("Resend success")
        }).catch(err => {
            console.log("Resend fail")
        })
    }

    useEffect(() => {
        dispatch(setHeader(false))

        if(userData.currentUser === null){
            navigate("/")
        }
        else if(userData.currentUser.verified){
            const interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1)
            }, 1000)
            
            setTimeout(() => {
                navigate("/")
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [])
  return (
    <>
    {userData.currentUser != null ? (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen min-w-screen bg-[#0c0d0c]">
        <div className="flex items-center mb-5">
            <Quotes size={64} className='text-[#A9A74F] hover:cursor-pointer' weight='bold' onClick={() => {window.location.href = "/"}}/>
            <span className='text-4xl text-white usedbquotes ms-2 hover:cursor-pointer select-none hidden md:flex' onClick={() => {window.location.href = "/"}}>Double<span className='text-[#A9A74F]'>Quotes</span></span>
        </div>
        {userData.currentUser.verified ? (
        <div className="flex flex-col justify-center relative items-center w-[360px] sm:w-[500px] h-[350px] bg-[#0f100f] rounded-xl">
            <Lottie className="absolute top-3" animationData={SuccessAnimation} loop={false} style={{ width: 150, height: 150 }}/>
            <span className="ps-5 pe-5 text-xl text-justify font-sans">Your account appears to be already verified.</span>
            <span className="absolute bottom-20 font-sans text-lg text-gray-400">¯\_(ツ)_/¯</span>
            <span className="absolute bottom-7 font-sans ps-5 pe-5 text-justify text-gray-400">Don't know why you are here though. Sending you back home in {countdown} seconds</span>
        </div>
        ) : (
        <div className="flex flex-col justify-center relative items-center w-[360px] sm:w-[500px] h-[450px] bg-[#0f100f] rounded-xl">
            <Lottie className="absolute top-3" animationData={SuccessAnimation} loop={false} style={{ width: 150, height: 150 }}/>
            <span className="ps-5 pe-5 text-2xl font-semibold mt-24 mb-5 text-justify font-sans">Email verification pending</span>
            <span className="ps-5 pe-5 text-base text-justify font-sans text-gray-400">We have sent an email for verification. Follow the instructions in email for logging into your account.</span>
            <button className="mt-7 p-2 ps-10 pe-10 bg-[#A9A74F] hover:bg-[#A9A74F]/75 rounded-3xl" onClick={() => {resendEmail()}}>Resend email</button>
            <span className="mt-3 ps-5 pe-5 text-base text-justify font-sans text-gray-400">Email already verified? <Link className="text-[#A9A74F]" to="/profile">Click here</Link></span>
        </div>
        )}
        
    </div>
    </>
    ) : (
        null
    )}
    </>
  )
}
