import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./components/Navbar";

const BACKEND_URL = "http://localhost:3001/generate-image"

function App(){

  const {
    register,
    handleSubmit,
    formState:{errors}} = useForm()
  
  const [imageUrl,setImageUrl] = useState(null)
  const [loading,setLoading] = useState(false)
  const [apiError,setApiError] = useState("")

  async function onGenerate(data){
    setLoading(true)
    setApiError("")
    setImageUrl(null)

    try{
      const response = await fetch(BACKEND_URL,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            prompt:data.prompt
          })

          
        }
      )
      if(!response.ok){
        throw new Error("Something went wrong while generating the image.")
      }
      const result = await response.json()

      // Encode image to base64 (text format-string) 
      setImageUrl(`data:image/jpeg;base64,${result.image}`)
      
    }
    catch(err){
      setApiError(err.message)
    }
    finally{
      setLoading(false)
    }
  }
  return <>
    <Navbar />
    {/* Body */}
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 flex items-center justify-center px-4 py-12">
      {/* Container */}
      <div className="w-full max-w-lg bg-slate-900 p-8 border border-slate-800 rounded-2xl shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl text-white font-semibold">AI Image Generator</h1>
            <p className="text-slate-400 text-sm mt-2">Describe an image and lets AI create it for you</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onGenerate)}>

            <label className="text-slate-300 mb-2 text-sm block" >Prompt</label>
            <textarea {...register("prompt",{required:true,minLength:{value:3,message:"Prompt must be atleast 3"}})} placeholder="Example: a cat astronaut floating in space" rows={3} className="w-full rounded-lg text-white p-3 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"></textarea>
            
            {errors.prompt && (<p className="text-red-400 mt-2 text-sm">{errors.prompt.message}</p>)}
            <button disabled={loading} type="submit" className="w-full bg-violet-600 mt-5 py-3 rounded-lg text-white font-medium hover:bg-violet-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors">{loading ? "Generating...":"Generate Image"}</button>

          </form>

          {apiError && (
            <p className="mt-4 text-red-400 text-sm text-center">{apiError}</p>
          )}

          {loading && (<div className="flex justify-center mt-6"><div className="h-10 w-10 border-4 border-slate-700 border-t-violet-500 rounded-full animate-spin"></div></div>)}
      
          {imageUrl && !loading && (
            <div className="mt-6">
              <img src={imageUrl} alt="Generated Image" className="w-full rounded-lg border border-slate-800" />
              <a href={imageUrl} download="ai-image.jpg" className="block text-center mt-3 text-violet-400 hover:text-violet-300 text-sm">Download Image</a>
            </div>
          )}
      </div>
    </div>
  </>
}
export default App