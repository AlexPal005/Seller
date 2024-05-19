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

    }


}
export const PostContext = createContext<PostContextType>(PostContextDefault)
export const CreatePost = () => {
    const {User} = useContext(UserContext)
    const [productName, setProductName] = useState("")
    const [categoryId, setCategoryId] = useState(-1)
    const [images, setImages] = useState<string[]>([])
    const [description, setDescription] = useState("")
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [price, setPrice] = useState(0)

    useEffect(() => {
        console.log(price)
    }, [price])

    const createPost = () => {
        Axios.post('product/create', {
            name: productName,
            description: description,
            price: price,
            createdAt: new Date(),
            categoryId: categoryId,
            userId: 1,
            images: images,
            cityName: city,
            regionName: region


        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
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
            setPrice
        }}>
            <div className='create-post-container'>
                <h2 className='create-post-container__title'>Створити оголошення</h2>
                <DetailsCreatePost categoryId={categoryId}/>
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