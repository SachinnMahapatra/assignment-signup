'use client'
import Footer from "@/src/Footer"
import Google from "next-auth/providers/google"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return <>

<div className="min-h-screen flex items-center justify-center bg-blue-200 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 ">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Welcome 
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {
              session
              ? `hello, ${session.user.name}!` 
              : 'Please Log in'
            }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             
              

{
  session 
  ? <button className="px-6 py-3 bg-amber-700 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:bg-amber-950"
  onClick={() => signOut()}>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  Log out
                </span>
              </button> 

  
  : <button className="px-6 py-3 bg-amber-700 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:bg-amber-950"
  onClick={() => signIn("google")}>
                <span className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  Log In
                </span>
              </button>
              }


            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>

   
  </>
}