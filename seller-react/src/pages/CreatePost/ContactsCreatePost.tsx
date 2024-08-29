import './contacts.scss'
import React, {SetStateAction, useContext} from "react";
import {PostContext} from "./CreatePost.tsx";

type ContactsCreatePostProps = {
    userNameError: string;
    setUserNameError: React.Dispatch<React.SetStateAction<string>>
    emailError: string
    setEmailError: React.Dispatch<React.SetStateAction<string>>
    phoneNumberError: string
    setPhoneNumberError: React.Dispatch<React.SetStateAction<string>>
}
export const ContactsCreatePost = ({
                                       userNameError,
                                       setUserNameError,
                                       emailError,
                                       setEmailError,
                                       phoneNumberError,
                                       setPhoneNumberError
                                   }: ContactsCreatePostProps) => {
    const {
        setUserName,
        setEmail,
        setPhoneNumber
    } = useContext(PostContext)
    const onChangeUserName = (e: { target: { value: SetStateAction<string>; }; }) => {
        if (e.target.value.length < 2) {
            setUserNameError("Ім'я надто коротке!")
        } else {
            setUserNameError("")
            setUserName(e.target.value)
        }

    }
    const onChangeEmail = (e: { target: { value: string } }) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (emailRegex.test(e.target.value)) {
            setEmailError('')
            setEmail(e.target.value)
        } else {
            setEmailError("Це не схоже на email!")
        }
    }
    const onChangePhoneNumber = (e: { target: { value: string } }) => {
        const phoneNumberRegex = /^\+?3?8?(0\d{9})$/

        if (phoneNumberRegex.test(e.target.value)) {
            setPhoneNumberError('')
            setPhoneNumber(e.target.value)
        } else {
            setPhoneNumberError("Це не схоже на номер телефону!")
        }
    }
    return (
        <div className='white-block-mt20 white-block' id="create-post-contacts">
            <h4>Контакти</h4>
            <form>
                <p className='blue-text-16 white-block-mt20'>Контактна особа</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Ім'я"
                       onChange={onChangeUserName}
                />
                {userNameError && <p className="error">{userNameError}</p>}
                <p className='blue-text-16 white-block-mt20'>Email</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Email"
                       onChange={onChangeEmail}
                />
                {emailError && <p className="error">{emailError}</p>}
                <p className='blue-text-16 white-block-mt20'>Номер телефону</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Телефон"
                       onChange={onChangePhoneNumber}
                />
                {phoneNumberError && <p className="error">{phoneNumberError}</p>}
            </form>
        </div>
    )
}