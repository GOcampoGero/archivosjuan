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


const Register = () => {

    const [newUser, setNewUser] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if(Validations()){

            createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(userCredential)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                })
    
            setNewUser({
                name: '',
                lastname: '',
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
            if (newUser.name.length < 3){
                setErrors({...errors, name: "Require a minimun of 3 characters"})
            } else { setErrors({...errors, name: ''})}
        }

        let validatelastname = () => {
            if (!newUser.lastname){
                setErrors({...errors, lastname: "Require camp"})
            } else { setErrors({...errors, lastname: ''})}
        }

        let validateemail = () => {
            if (newUser.email !== "/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/"){
                setErrors({...errors, email: "invalid email"})
            } else { setErrors({...errors, email: ''})}
        }

        let validatePassword = () => {
            if (newUser.password.length < 4 || newUser.password.length > 12){
                setErrors({...errors, password: "Minimun of 4 characters and maximun 12 characters"})
            } else { setErrors({...errors, password: ''})}
        }

        let validateconfirmpassword = () => {
            if (newUser.password !== newUser.confirmPassword){
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
                <h1>Create your account</h1>
                <div>
                    <label htmlFor="">Name: </label>
                    <input type="text" value={newUser.name} name="name" onChange={handleChange} onBlur={validateName} />
                    {errors.name && <p className={style.errors}>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="">lastname</label>
                    <input type="text" value={newUser.lastname} name="lastname" onChange={handleChange} onBlur={validatelastname} />
                    {errors.name && <p className={style.errors}>{errors.lastname}</p>}
                </div>
                <div>
                    <label htmlFor="">Email: </label>
                    <input type="text" value={newUser.email} name="email" onChange={handleChange} onBlur={validateemail}/>
                    {errors.name && <p className={style.errors}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="">Password: </label>
                    <input type="password" value={newUser.password} name="password" onChange={handleChange} onBlur={validatePassword}/>
                    {errors.name && <p className={style.errors}>{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="">Confirm Password: </label>
                    <input type="password" value={newUser.confirmPassword} name="confirmPassword" onChange={handleChange} onBlur={validateconfirmpassword}/>
                    {errors.name && <p className={style.errors}>{errors.confirmPassword}</p>}
                </div>
                <button onClick={handleSubmit}>Create</button>
            </div>
        </div>
    )
}

export default Register