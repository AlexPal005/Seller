import {useContext} from "react";
import {PostContext} from "../CreatePost/CreatePost.tsx";

type CreatePostPriceProps = {
    priceError: string
}
export const CreatePostPrice = ({priceError}: CreatePostPriceProps) => {
    const {setProductToCreate, setErrors, productToCreate} = useContext(PostContext)
    const onChangePrice = (e: { target: { value: string; }; }) => {
        const regex = /^[0-9]*\.?[0-9]+$/
        setProductToCreate(prev => ({
            ...prev, price: Number(e.target.value)
        }))
        if (!regex.test(e.target.value)) {
            setErrors(prev => ({...prev, price: "Будь ласка, вкажіть правильну ціну! Ціна має бути просто числом!"}))
        } else {
            setErrors(prev => ({...prev, price: ""}))
        }
    }
    return (
        <div className='white-block-mt20 white-block' id='create-post-price'>
            <h4>Ціна</h4>
            <input type='text'
                   className='create-post-contact-input white-block-mt20'
                   placeholder="Ціна"
                   onChange={onChangePrice}
                   value={productToCreate.price || ''}
            />
            {priceError && <p className="error">{priceError}</p>}
        </div>
    )
}