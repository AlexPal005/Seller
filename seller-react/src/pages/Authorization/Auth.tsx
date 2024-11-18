import './auth.scss'
import {Button} from "../../components/Button/Button.tsx";
import {useState} from "react";
import {useAuth} from "../../Hooks/Auth.tsx";
import {Navigate, NavLink, Route, Routes, useNavigate} from "react-router-dom";


export const Auth = () => {
    const {signIn, signUp} = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [error, setError] = useState("")

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }


    const onChangeEmail = (e: { target: { value: string; }; }) => {
        setError("")
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setEmailError("Невірний формат пошти");
        } else {
            setEmailError("");
        }
    }

    const onChangePassword = (e: { target: { value: string } }) => {
        setError("")
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!validatePassword(newPassword)) {
            setPasswordError("Пароль повинен містити принаймні 8 символів, включаючи принаймні одну велику літеру та одну цифру");
        } else {
            setPasswordError("");
        }
    }

    const onClickLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (validateEmail(email) && validatePassword(password)) {

            signIn(email, password).then(() => {
                navigate('/account/posts/active', {replace: true})
            }).catch(() => setError("Невірний email чи пароль!"))
        }
    }

    const onClickRegister = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (validateEmail(email) && validatePassword(password)) {
            signUp(email, password).then(res => {
                console.log(res)
                navigate('/account/posts/active')
            }).catch(error => {
                console.log(error)
                const message = (error.response.data === "Email is taken!")
                    ? "Користувач з таким email вже існує!" : ""
                setError(message)
            })
        }

    }

    return (
        <div className='auth-container content'>
            <form className='auth-form'>
                <div className='auth-form__menu'>
                    <NavLink to='/auth/login' className='auth-form__menu-item'>Увійти</NavLink>
                    <NavLink to='/auth/register' className='auth-form__menu-item'>Зареєструватися</NavLink>
                </div>
                <hr className='auth-form__underline'/>

                <label htmlFor='email' className='auth-form__description'>Електронна пошта</label>
                <input id='email' className='auth-form__input' type='text' onChange={onChangeEmail}/>
                {emailError && <p className='error error-auth'>{emailError}</p>}

                <label htmlFor='password' className='auth-form__description'>Пароль</label>
                <input id='password' className='auth-form__input' type='password' onChange={onChangePassword}/>
                {passwordError && <p className='error error-auth'>{passwordError}</p>}
                {error && <p className='error error-auth'>{error}</p>}
                <Routes>
                    <Route path='/login' element={
                        <>
                            <p className='register-text-info'>Забули пароль?</p>
                            <Button
                                text={'Увійти'}
                                onClick={onClickLogin}
                                className='auth-form__button'
                            />
                        </>
                    }/>
                    <Route path='/register'
                           element={
                               <>
                                   <p className='register-text-info'>Створюючи профіль на Seller,
                                       ви погоджуєтеся з Умовами користування</p>
                                   <Button
                                       text={'Зареєструватись'}
                                       onClick={onClickRegister}
                                       className='auth-form__button'
                                   />
                               </>
                           }/>

                    <Route
                        path="*"
                        element={<Navigate replace to="/auth/login"/>}
                    />
                </Routes>


            </form>
        </div>
    )
}