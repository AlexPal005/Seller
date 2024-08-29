import './create-post.scss'
import {DetailsCreatePost} from "./DetailsCreatePost/DetailsCreatePost.tsx";
import {Photo} from "./Photo.tsx";
import {Description} from "./Description.tsx";
import {LocationCreatePost} from "./LocationCreatePost.tsx";
import {ContactsCreatePost} from "./ContactsCreatePost.tsx";
import {CreatePostSubmit} from "./CreatePostSubmit.tsx";
import React, {createContext, useContext, useEffect, useState} from "react";
import Axios from "../../Axios.ts";
import {UserContext} from "../../App.tsx";
import {CreatePostPrice} from "./CreatePostPrice/CreatePostPrice.tsx";
import {useNavigate} from "react-router-dom";

type PostContextType = {
    setProductName: React.Dispatch<React.SetStateAction<string>>,
    setCategoryId: React.Dispatch<React.SetStateAction<number>>,
    setImages: React.Dispatch<React.SetStateAction<string[]>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>
    setCity: React.Dispatch<React.SetStateAction<string>>
    setRegion: React.Dispatch<React.SetStateAction<string>>
    setUserName: React.Dispatch<React.SetStateAction<string>>
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    categoryId: number,
}

const PostContextDefault = {
    setProductName: () => {
    },
    setCategoryId: () => {
    },
    setImages: () => {
    },
    setDescription: () => {

    },
    setCity: () => {
    },
    setRegion: () => {

    },
    setUserName: () => {

    },
    setEmail: () => {

    },
    setPhoneNumber: () => {

    },
    setPrice: () => {

    },
    categoryId: -1,
}
export const PostContext = createContext<PostContextType>(PostContextDefault)
export const CreatePost = () => {
    const navigate = useNavigate()
    const {User} = useContext(UserContext)
    const [productName, setProductName] = useState("")
    const [errorProductName, setErrorProductName] = useState("")
    const [categoryId, setCategoryId] = useState(-1)
    const [errorCategory, setErrorCategory] = useState("")
    const [images, setImages] = useState<string[]>([])
    const [description, setDescription] = useState("")
    const [errorDescription, setErrorDescription] = useState("")
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [locationError, setLocationError] = useState('')
    const [userName, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [price, setPrice] = useState(0)
    const [priceError, setPriceError] = useState('')

    const setErrors = () => {
        if (productName.length < 16) {
            setErrorProductName('Заголовок надто короткий. Додайте більше деталей!')
        }
        if (categoryId === -1) {
            setErrorCategory('Оберіть категорію!')
        }
        if (description.length < 40) {
            setErrorDescription("Опис надто короткий. Додайте більше деталей!")
        }
        if (!price) {
            setPriceError("Вкажіть ціну!")
        }
        if (!city || !region) {
            setLocationError('Оберіть населений пункт зі списку!')
        }
        if (!userName) {
            setUserNameError("Уведіть ім'я користувача!")
        }
        if (!email) {
            setEmailError("Уведіть email!")
        }
        if (!phoneNumber) {
            setPhoneNumberError("Уведіть номер телефону!")
        }

    }

    useEffect(() => {
        if (city && region) {
            setLocationError('')
        }
    }, [city, region])

    useEffect(() => {
        console.log(city)
    }, [city])

    const setLinkToScroll = () => {
        if (errorProductName || errorCategory) {
            return 'create-post-details'
        } else if (errorDescription) {
            return 'create-post-description'
        } else if (priceError) {
            return 'create-post-price'
        } else if (locationError) {
            return 'create-post-location'
        } else if (userNameError || phoneNumberError || emailError) {
            return 'create-post-contacts'
        } else {
            return ''
        }
    }

    const scroll = (link: string) => {
        const element = document.getElementById(link)
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
        }
    }

    const createPostRequest = () => {
        Axios.post('product/create', {
            name: productName,
            description: description,
            price: price,
            createdAt: new Date(),
            categoryId: categoryId,
            userId: User && User.userId,
            images: images,
            cityName: city,
            regionName: region


        }).then(res => {
            console.log(res)
            navigate('/account/posts')
        }).catch(err => {
            console.log(err)
        })
    }
    const createPost = () => {
        setErrors()
        const linkToNavigateError = setLinkToScroll()

        if (linkToNavigateError) {
            scroll(linkToNavigateError)
        } else {
            createPostRequest()
        }
    }

    return (
        <PostContext.Provider value={{
            setProductName,
            setCategoryId,
            setImages,
            setDescription,
            setCity,
            setRegion,
            setUserName,
            setEmail,
            setPhoneNumber,
            setPrice,
            categoryId
        }}>
            <div className='create-post-container'>
                <h2 className='create-post-container__title'>Створити оголошення</h2>
                <DetailsCreatePost
                    categoryId={categoryId}
                    setErrorProductName={setErrorProductName}
                    errorProductName={errorProductName}
                    errorCategory={errorCategory}
                />
                <Photo/>
                <Description
                    errorDescription={errorDescription}
                    setErrorDescription={setErrorDescription}
                />
                <CreatePostPrice
                    priceError={priceError}
                    setPriceError={setPriceError}
                />
                <LocationCreatePost
                    locationError={locationError}
                />
                <ContactsCreatePost
                    userNameError={userNameError}
                    setUserNameError={setUserNameError}
                    emailError={emailError}
                    setEmailError={setEmailError}
                    phoneNumberError={phoneNumberError}
                    setPhoneNumberError={setPhoneNumberError}
                />
                <CreatePostSubmit createPost={createPost}/>
            </div>
        </PostContext.Provider>
    )
}