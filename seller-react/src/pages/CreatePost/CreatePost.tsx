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
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (categoryId !== -1) {
            setErrorCategory('')
        }
        console.log(categoryId)
    }, [categoryId])

    const createPost = () => {
        let linkToNavigateError = ''
        if (errorProductName || productName.length < 16 || errorCategory || categoryId === -1) {
            if (productName.length < 16) {
                setErrorProductName('Заголовок надто короткий. Додайте більше деталей!')
            }
            if (categoryId === -1) {
                setErrorCategory('Оберіть категорію!')
            }
            linkToNavigateError = 'create-post-details'
        } else {
            linkToNavigateError = ''
        }

        if (linkToNavigateError) {
            const element = document.getElementById(linkToNavigateError)
            if (element) {
                element.scrollIntoView({behavior: 'smooth'})
                return
            }
        } else {
            Axios.post('product/create', {
                name: productName,
                description: description,
                price: price,
                createdAt: new Date(),
                categoryId: categoryId,
                userId: User.userId,
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
                <Description/>
                <CreatePostPrice/>
                <LocationCreatePost/>
                <ContactsCreatePost/>
                <CreatePostSubmit createPost={createPost}/>
            </div>
        </PostContext.Provider>
    )
}