import React, {useContext} from "react";
import {PostContext} from "../CreatePost.tsx";

type CreatePostPriceProps = {
    priceError: string,
    setPriceError: React.Dispatch<React.SetStateAction<string>>
}
export const CreatePostPrice = ({priceError, setPriceError}: CreatePostPriceProps) => {
    const {setPrice} = useContext(PostContext)
    const onChangePrice = (e: { target: { value: string } }) => {

        const regex = /^[0-9]*\.?[0-9]+$/
        if (!regex.test(e.target.value)) {
            setPriceError("Будь ласка, вкажіть правильну ціну! Ціна має бути просто числом!")
        } else {
            setPriceError("")
            setPrice(Number(e.target.value))
        }
    }
    return (
        <div className='white-block-mt20 white-block' id='create-post-price'>
            <h4>Ціна</h4>
            <input type='text'
                   className='create-post-contact-input white-block-mt20'
                   placeholder="Ціна"
                   onChange={onChangePrice}
            />
            {priceError && <p className="error">{priceError}</p>}
        </div>
    )
}