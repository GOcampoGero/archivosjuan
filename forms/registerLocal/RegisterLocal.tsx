'use client';
import style from '../register/Register.module.css'
import Image from "next/image";
import { signInProvider } from "@/app/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "@/lib/redux/hooks";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { signInProvider } from "@/app/utils";


const RegisterLocal = () => {

    const [newLocal, setNewLocal] = useState({
        nameLocal: '',
        typeLocal: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewLocal({
            ...newLocal,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if(Validations()){

           console.log(newLocal)
    
            setNewLocal({
                nameLocal: '',
                typeLocal: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
    }

        //validations

        const [errors, setErrors] = useState({
            name: '', lastname: '', email: '', password: '', confirmPassword: ''
        })

        let validateName = () => {
            if (newLocal.nameLocal.length < 3){
                setErrors({...errors, name: "Require a minimun of 3 characters"})
            } else { setErrors({...errors, name: ''})}
        }

        let validatelastname = () => {
            if (!newLocal.typeLocal){
                setErrors({...errors, lastname: "Require camp"})
            } else { setErrors({...errors, lastname: ''})}
        }

        let validateemail = () => {
            if (newLocal.email !== "/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/"){
                setErrors({...errors, email: "invalid email"})
            } else { setErrors({...errors, email: ''})}
        }

        let validatePassword = () => {
            if (newLocal.password.length < 4 || newLocal.password.length > 12){
                setErrors({...errors, password: "Minimun of 4 characters and maximun 12 characters"})
            } else { setErrors({...errors, password: ''})}
        }

        let validateconfirmpassword = () => {
            if (newLocal.password !== newLocal.confirmPassword){
                setErrors({...errors, confirmPassword: "the passwords no son iguales"})
            } else { setErrors({...errors, confirmPassword: ''})}
        }

        let Validations = () => {
            if (errors.name === ''){
                return true
            }
            return false
        }
    return(
        <div className="h-full grid grid-flow-row sm:grid-flow-col gap-3">
            <div className={style.containerImage}>
                <Image src='/logopanda.svg' width={500} height={500} color='with' alt='menu'></Image>
            </div>
            <div className={style.containerForm}>
                <h1>Register your Local</h1>
                <div>
                    <label htmlFor="">Name: </label>
                    <input type="text" value={newLocal.nameLocal} name="nameLocal" onChange={handleChange} onBlur={validateName} />
                    {errors.name && <p className={style.errors}>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="">Type of Local</label>
                    <input type="text" value={newLocal.typeLocal} name="typeLocal" onChange={handleChange} onBlur={validatelastname} />
                    {errors.name && <p className={style.errors}>{errors.lastname}</p>}
                </div>
                <div>
                    <label htmlFor="">Email: </label>
                    <input type="text" value={newLocal.email} name="email" onChange={handleChange} onBlur={validateemail}/>
                    {errors.name && <p className={style.errors}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="">Password: </label>
                    <input type="password" value={newLocal.password} name="password" onChange={handleChange} onBlur={validatePassword}/>
                    {errors.name && <p className={style.errors}>{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="">Confirm Password: </label>
                    <input type="password" value={newLocal.confirmPassword} name="confirmPassword" onChange={handleChange} onBlur={validateconfirmpassword}/>
                    {errors.name && <p className={style.errors}>{errors.confirmPassword}</p>}
                </div>
                <button onClick={handleSubmit}>Create</button>
            </div>
        </div>
    )
}

export default RegisterLocal