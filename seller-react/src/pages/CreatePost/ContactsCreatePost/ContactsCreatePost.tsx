import './contacts.scss'
import {useContext} from "react";
import {PostContext} from "../CreatePost/CreatePost.tsx";

type ContactsCreatePostProps = {
    userNameError: string;
    emailError: string
    phoneNumberError: string
}
export const ContactsCreatePost = ({
                                       userNameError,
                                       emailError,
                                       phoneNumberError,
                                   }: ContactsCreatePostProps) => {
    const {
        setProductToCreate, productToCreate, setErrors
    } = useContext(PostContext)
    const onChangeUserName = (e: { target: { value: string; }; }) => {
        setProductToCreate(prev => ({
            ...prev, userName: e.target.value
        }))
        if (e.target.value.length < 2) {
            setErrors(prev => ({...prev, userName: "Ім'я надто коротке!"}))
        } else {
            setErrors(prev => ({...prev, userName: ""}))
        }

    }
    const onChangeEmail = (e: { target: { value: string } }) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        setProductToCreate(prev => ({
            ...prev, email: e.target.value
        }))
        if (emailRegex.test(e.target.value)) {
            setErrors(prev => ({...prev, email: ""}))
        } else {
            setErrors(prev => ({...prev, email: "Це не схоже на email!"}))
        }
    }
    const onChangePhoneNumber = (e: { target: { value: string } }) => {
        const phoneNumberRegex = /^\+?3?8?(0\d{9})$/
        setProductToCreate(prev => ({
            ...prev, phoneNumber: e.target.value
        }))
        if (phoneNumberRegex.test(e.target.value)) {
            setErrors(prev => ({...prev, phoneNumber: ""}))
        } else {
            setErrors(prev => ({...prev, phoneNumber: "Це не схоже на номер телефону!"}))
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
                       value={productToCreate.userName}
                />
                {userNameError && <p className="error">{userNameError}</p>}
                <p className='blue-text-16 white-block-mt20'>Email</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Email"
                       onChange={onChangeEmail}
                       value={productToCreate.email}
                />
                {emailError && <p className="error">{emailError}</p>}
                <p className='blue-text-16 white-block-mt20'>Номер телефону</p>
                <input type='text'
                       className='create-post-contact-input'
                       placeholder="Телефон"
                       onChange={onChangePhoneNumber}
                       value={productToCreate.phoneNumber}
                />
                {phoneNumberError && <p className="error">{phoneNumberError}</p>}
            </form>
        </div>
    )
}