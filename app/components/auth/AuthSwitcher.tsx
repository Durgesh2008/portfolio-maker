import { useSearchParams } from "@remix-run/react";
import SignIn from "./SignIn";
import NavigationField from "./NavigationField";
import SignUp from "./Signup";


const AuthSwitcher = () => {
  const signInTitle = 'Register with your personal details to use all site features'
  const signUpTitle = 'Already have account.'
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const authMode = mode ? mode : "signin"
  const navigationTitle = authMode === 'signin' ? signInTitle : signUpTitle;
  const isSignIn = authMode==='signin';
  return (
    <div
  className={`relative bg-white w-[800px] max-w-full min-h-[480px] rounded-3xl shadow-lg overflow-hidden transition-transform duration-500 ease-in-out`}
>
  <div
    className={`absolute top-0 ${isSignIn ? 'left-0' : 'left-1/2'} 
                h-full w-1/2 p-10 transition-all duration-500 ease-in-out z-10`}
  >
    {authMode === 'signin' ? <SignIn /> : <SignUp />}
  </div>
  <div
    className={`absolute top-0 ${isSignIn ? 'left-1/2' : 'left-0'} 
                w-1/2 h-full bg-gradient-to-r from-blue-600 to-blue-800 
                text-white transition-all duration-500 ease-in-out 
                flex flex-col items-center justify-center px-10`}
  >
    <NavigationField
      title={navigationTitle}
      mode={authMode}
      btnTxt={authMode === 'signup' ? 'Sign In' : 'Sign Up'}
    />
  </div>
</div>

  )
}

export default AuthSwitcher
