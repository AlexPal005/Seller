import {IoIosArrowDown} from "react-icons/io";

export const DetailsCreatePost = () => {
    return (
        <div className='create-post-details white-block'>
            <h4>Деталі оголошення</h4>
            <form>
                <div className='create-post-container__wrapper'>
                    <p className='blue-text-16'>Вкажіть назву</p>
                    <input
                        id='product-name'
                        className='create-post-details__name'
                        type='text'
                        placeholder='Наприклад, xiaomi redmi note 9 pro'
                    />
                </div>
                <div className='create-post-container__wrapper'>
                    <p className='blue-text-16'>Категорія</p>
                    <button
                        className='create-post-details__category-button'
                    >
                        <span>Виберіть категорію</span>
                        <IoIosArrowDown className='icon-arrow'/>
                    </button>
                </div>
            </form>
        </div>
    )
}