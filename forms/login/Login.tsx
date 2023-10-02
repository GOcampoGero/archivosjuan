"use client";
import styles from './Login.module.css';
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { signInProvider } from "@/app/utils";
import { setUser } from "@/lib/redux/features/userProfile";
import { useDispatch } from "@/lib/redux/hooks";
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((response) => {
          dispatch(
            setUser({
              id: response.user.uid,
              email: response.user.email,
              photoUrl: response.user.photoURL,
              name: response.user.displayName,
            })
          );
        })
        .catch((error) => {
          alert(error.message);
        });
  };

  const handlerClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event;
    const data = await signInProvider(value);
    dispatch(
      setUser({
        id: data.id,
        email: data.email,
        photoUrl: data.photoUrl,
        name: data.name,
      })
    );
  };

  return (
    <div className={styles.containerAll}>
      <div className={styles.container}>
        <div className={styles.containerFormBtn}>
          <h1 className={styles.title}>LOGIN</h1>
          <form onSubmit={handleSubmit} className={styles.containerForm}>
            <div className={styles.containerEmail}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div> 
            <div className={styles.containerPassword}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
               <Link className={styles.forgotPassword} href='/restartPasword'>forgot password?</Link>
            </div>
            <div>
              <button type="submit">Iniciar Sesión</button>
            </div>
          </form>
          <div className={styles.containerGF}>
            <div>
              <button onClick={handlerClick} value={"google"}>
              <Image src='/google.svg' width={20} height={20} color='with' alt='menu'></Image>
              </button>
            </div>
            <div>
              <button onClick={signInProvider} value={"facebook"}>
              <Image src='/face.svg' width={20} height={20} color='with' alt='menu'></Image>
              </button>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Login;