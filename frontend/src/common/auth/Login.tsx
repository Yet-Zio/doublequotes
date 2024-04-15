import { useEffect } from "react";
import Doodle from "./Doodle";

export default function Login() {

  const handleGoogleSigninResponse = (response: any) => {
    console.log("Encoded JWT:", response.credential)
  }

  const initGoogleSignIn = () => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GAUTH_CLIENT_ID,
      callback: handleGoogleSigninResponse
    })

    // @ts-ignore
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

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []); 

  const handleBGClick = () => {
    clearInterval(interval)
    genDoodle()
    interval = setInterval(genDoodle, 2000)
  }

  const genDoodle = () => {
    document.querySelectorAll('css-doodle').forEach(function (o: any) {o.update()})
  }

  var interval = setInterval(genDoodle, 2000)

  return (
    <div className="flex min-w-screen min-h-screen justify-center items-center">
      <div className="flex w-full h-full select-none" onClick={() => handleBGClick()}>
        <Doodle/>
      </div>
      <div className="absolute flex flex-col w-[530px] h-[644px] bg-[#1a1e15] rounded-2xl useinter p-10">
          <span className="text-2xl font-extrabold">Log In</span>
          <span className="mt-2 text-xs text-gray-300">By continuing, you can use Double Quotes to its full extent. Your data is not used for any other purposes as this is a hobby project.</span>
          <div id="gSignInDiv" className="mt-3 rounded-full overflow-hidden self-center"></div>
          <div className="flex mt-5 justify-center items-center">
            <div className='flex border-0 h-[1px] w-full bg-[#3e4535] me-2'></div>
            <span className="text-[#6a765b] text-sm">OR</span>
            <div className='flex border-0 h-[1px] w-full bg-[#3e4535] ms-2'></div>
          </div>
          <input type="text" className="mt-5 ms-5 me-5 p-4 ps-5 pe-5 rounded-3xl outline-0 bg-zinc-700 text-gray-400 placeholder-gray-400 hover:bg-zinc-700/75" placeholder="Email or username *"/>
          <input type="password" className="mt-5 ms-5 me-5 p-4 ps-5 pe-5 rounded-3xl outline-0 bg-zinc-700 text-gray-400 placeholder-gray-400 hover:bg-zinc-700/75" placeholder="Password *"/>
        </div>
    </div>
  );
}