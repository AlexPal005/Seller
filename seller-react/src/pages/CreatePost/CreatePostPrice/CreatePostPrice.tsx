import {SetStateAction, useContext} from "react";
import {PostContext} from "../CreatePost.tsx";

export const CreatePostPrice = () => {
    const {setPrice} = useContext(PostContext)
    const onChangePrice = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPrice(Number(e.target.value))
    }
    return (
        <div className='white-block-mt20 white-block'>
            <h4>Ціна</h4>
            <input type='text'
                   className='create-post-contact-input white-block-mt20'
                   placeholder="Ціна"
                   onChange={onChangePrice}
            />
        </div>
    )
}