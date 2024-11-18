import './create-post.scss'
import {DetailsCreatePost} from "../DetailsCreatePost/DetailsCreatePost.tsx";
import {Photo} from "../Photo/Photo.tsx";
import {Description} from "../Description/Description.tsx";
import {LocationCreatePost} from "../Location/LocationCreatePost.tsx";
import {ContactsCreatePost} from "../ContactsCreatePost/ContactsCreatePost.tsx";
import {CreatePostSubmit} from "../CreatePostSubmit/CreatePostSubmit.tsx";
import React, {createContext, useContext, useEffect, useState} from "react";
import Axios from "../../../Axios.ts";
import {UserContext} from "../../../App.tsx";
import {CreatePostPrice} from "../CreatePostPrice/CreatePostPrice.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Preview} from "../Preview/Preview.tsx";
import {Product, Status} from "../../../Hooks/Product.tsx";

type PostContextType = {
    setProductToCreate: React.Dispatch<React.SetStateAction<ProductToCreate>>,
    productToCreate: ProductToCreate,
    setErrors: React.Dispatch<React.SetStateAction<Errors>>,
}

const PostContextDefault = {
    setProductToCreate: () => {
    },
    productToCreate: {
        productName: '',
        categoryId: -1,
        images: [],
        description: '',
        city: '',
        region: '',
        userName: '',
        email: '',
        phoneNumber: '',
        price: 0,
    },
    setErrors: () => {
    }
}
export const PostContext = createContext<PostContextType>(PostContextDefault)

interface ProductToCreate {
    productName: string;
    categoryId: number;
    images: string[];
    description: string;
    city: string;
    region: string;
    userName: string;
    email: string;
    phoneNumber: string;
    price: number;
}

export interface Errors {
    productName: string;
    category: string;
    description: string;
    location: string;
    userName: string;
    email: string;
    phoneNumber: string;
    price: string;
}

export const CreatePost = () => {
    const navigate = useNavigate()
    const {User} = useContext(UserContext)
    const [
        productToCreate,
        setProductToCreate
    ] = useState<ProductToCreate>({
        productName: '',
        categoryId: -1,
        images: [],
        description: '',
        city: '',
        region: '',
        userName: '',
        email: '',
        phoneNumber: '',
        price: 0,
    })

    const [productPreview, setProductPreview] = useState<Product>({
        name: 'User',
        productId: 0,
        productName: '',
        price: 0,
        cityName: '',
        regionName: '',
        mainImage: '',
        createdAt: '',
        categoryName: '',
        description: '',
        status: Status.PENDING
    })

    const [errors, setErrors] = useState<Errors>({
        productName: '',
        category: '',
        description: '',
        location: '',
        userName: '',
        email: '',
        phoneNumber: '',
        price: '',
    })
    const [linkToScrollUp, setLinkToScrollUp] = useState('')
    const [isClickedSubmit, setIsClickedSubmit] = useState(false)

    const setError = (field: keyof Errors, value: string) => {
        setErrors((prev) => ({...prev, [field]: value}))
    }
    const setErrorsHandler = () => {
        let hasErrors = false
        if (productToCreate.productName.length < 16) {
            setError('productName', 'Заголовок надто короткий. Додайте більше деталей!')
            hasErrors = true
        } else {
            setError('productName', '')
        }
        if (productToCreate.categoryId === -1) {
            setError('category', 'Оберіть категорію!')
            hasErrors = true
        } else {
            setError('category', '')
        }
        if (productToCreate.description.length < 40) {
            setError('description', 'Опис надто короткий. Додайте більше деталей!')
            hasErrors = true
        } else {
            setError('description', '')
        }
        if (!productToCreate.price) {
            setError('price', 'Вкажіть ціну!')
            hasErrors = true
        } else {
            setError('price', '')
        }
        if (!productToCreate.city || !productToCreate.region) {
            setError('location', 'Оберіть населений пункт зі списку!')
            hasErrors = true
        } else {
            setError('location', '')
        }
        if (!productToCreate.userName) {
            setError('userName', "Уведіть ім'я користувача!")
            hasErrors = true
        } else {
            setError('userName', '')
        }
        if (!productToCreate.email) {
            setError('email', "Уведіть email!")
            hasErrors = true
        } else {
            setError('email', '')
        }
        if (!productToCreate.phoneNumber) {
            setError('phoneNumber', "Уведіть номер телефону!")
            hasErrors = true
        } else {
            setError('phoneNumber', '')
        }
        return hasErrors
    }

    useEffect(() => {
        if (productToCreate.city && productToCreate.region) {
            setErrors((prev) => ({...prev, location: ''}));
        }
    }, [productToCreate.city, productToCreate.region])

    useEffect(() => {
        console.log(productToCreate.categoryId)
        if (productToCreate.categoryId !== -1) {
            setErrors((prev) => ({...prev, category: ''}));
        }
    }, [productToCreate.categoryId])

    const setLinkToScroll = () => {
        if (errors.productName || errors.category) {
            setLinkToScrollUp('create-post-details')
        } else if (errors.description) {
            setLinkToScrollUp('create-post-description')
        } else if (errors.price) {
            setLinkToScrollUp('create-post-price')
        } else if (errors.location) {
            setLinkToScrollUp('create-post-location')
        } else if (errors.userName || errors.phoneNumber || errors.email) {
            setLinkToScrollUp('create-post-contacts')
        } else {
            setLinkToScrollUp('')
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
            name: productToCreate.productName,
            description: productToCreate.description,
            price: productToCreate.price,
            createdAt: new Date(),
            categoryId: productToCreate.categoryId,
            userId: User && User.userId,
            images: productToCreate.images,
            cityName: productToCreate.city,
            regionName: productToCreate.region,
        }).then(res => {
            console.log(res)
            navigate('/account/posts/pending')
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        setLinkToScroll()
    }, [errors])

    useEffect(() => {
        if (isClickedSubmit && linkToScrollUp) {
            scroll(linkToScrollUp)
            setIsClickedSubmit(false)
        }
    }, [isClickedSubmit, linkToScrollUp])

    const createPost = () => {
        setIsClickedSubmit(true)
        const hasErrors = setErrorsHandler()
        if (!hasErrors) {
            createPostRequest()
        }
    }

    const previewHandler = () => {
        setIsClickedSubmit(true)
        const hasErrors = setErrorsHandler()
        if (!hasErrors) {
            setProductPreview({
                name: User?.lastName ? User.lastName : '',
                productId: 0,
                productName: productToCreate.productName,
                price: productToCreate.price,
                cityName: productToCreate.city,
                regionName: productToCreate.region,
                mainImage: productToCreate.images[0],
                createdAt: new Date().toDateString(),
                categoryName: "",
                description: productToCreate.description,
                status: Status.PENDING
            })
            navigate('/create-post/preview')
        }
    }

    return (
        <PostContext.Provider value={{
            setProductToCreate,
            productToCreate,
            setErrors
        }}>
            <div className='create-post-container'>
                <Routes>
                    <Route path='/adding' element={
                        <>
                            <h2 className='create-post-container__title'>Створити оголошення</h2>
                            <DetailsCreatePost
                                categoryId={productToCreate.categoryId}
                                errorProductName={errors.productName}
                                errorCategory={errors.category}
                            />
                            <Photo/>
                            <Description
                                errorDescription={errors.description}
                            />
                            <CreatePostPrice
                                priceError={errors.price}
                            />
                            <LocationCreatePost
                                locationError={errors.location}
                            />
                            <ContactsCreatePost
                                userNameError={errors.userName}
                                emailError={errors.email}
                                phoneNumberError={errors.phoneNumber}
                            />
                            <CreatePostSubmit createPost={createPost} previewHandler={previewHandler}/>
                        </>
                    }/>
                    <Route path='/preview' element={<Preview product={productPreview}/>}/>
                </Routes>

            </div>
        </PostContext.Provider>
    )
}