import React from 'react'
import logoImg from '../assets/frikt.png'
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuth, selectIsAuth } from "../redux/slices/auth.js";
import { useForm } from "react-hook-form";



export default function Login() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({
        mode:"onChange",
    })

    const onSubmit = async (values)=>{
        const data = await dispatch(fetchAuth(values))
        if(!data.payload){
            return alert('Cant auth')
        }
        if("token" in data.payload){
            window.localStorage.setItem("token", data.payload.token);
        }
    }
    if (isAuth) {
        return <Navigate to="/layout" />;
      }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={logoImg} alt="" />
        </div>
        <div className='bg-gray-800 flex flex-col justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} action="" className='max-w-[400px] w-full mx-auto bg-gray-900 px-8 py-8 rounded-lg'>
                <h2 className='text-4x1 dark:text-white font-bold text-center'>Sing In</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor="" >E-Mail</label>
                    <input 
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            {...register("email", { required: "Enter the mail" })} 
                            type="email" label="E-Mail" className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'/>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor="" >Password</label>
                    <input 
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            {...register("password", { required: "Enter the password" })}
                            type="password" className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'/>
                </div>
                <button className='w-full my-s py-2 bg-sky-500 shadow-lg shadow-sky-500/50'>Sing In</button>
            </form>
        </div>
    </div>
  )
}
