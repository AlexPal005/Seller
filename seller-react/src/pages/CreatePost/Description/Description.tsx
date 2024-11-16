import './description.scss'
import {useContext} from "react";
import {PostContext} from "../CreatePost/CreatePost.tsx";

type DescriptionProps = {
    errorDescription: string
}
export const Description = ({errorDescription}: DescriptionProps) => {
    const {
        setProductToCreate,
        productToCreate,
        setErrors
    } = useContext(PostContext)
    const onChangeDescription = (e: { target: { value: string }; }) => {
        setProductToCreate(prev => ({
            ...prev, description: e.target.value
        }))
        if (e.target.value.length < 40) {
            setErrors(prev => ({...prev, description: "Опис надто короткий. Додайте більше деталей!"}))
        } else {
            setErrors(prev => ({...prev, description: ""}))
        }
    }

    return (
        <div className='create-post-description white-block' id="create-post-description">
            <h4>Опис оголошення</h4>

            <textarea
                className='create-post-description__text'
                placeholder='Подумайте, що б ви хотіли дізнатись з оголошення...'
                onChange={onChangeDescription}
                value={productToCreate.description}
            />
            {errorDescription && <p className="error">{errorDescription}</p>}
        </div>
    )
}