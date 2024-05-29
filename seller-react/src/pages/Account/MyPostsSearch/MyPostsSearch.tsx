import './my-posts-search.scss'

export const MyPostsSearch = () => {
    return (
        <div className='my-posts-search'>
            <button className='my-posts-search-item button'>Додати фільтр</button>
            <input type='text' placeholder='Шукати за заголовком' className='my-posts-search-item'/>
            <input type='text' className='my-posts-search-item' placeholder='Будь-яка категорія'/>
            <select className='my-posts-search-item my-posts-search-select'>
                <option style={{display: 'none'}} selected disabled className='select-option'>Сортувати</option>
                <option value="1" className='select-option'>Заголовок А-Я</option>
                <option value="2" className='select-option'>Заголовок Я-А</option>
                <option value="3" className='select-option'>Час публікації</option>
            </select>
            <p className='my-posts-search-count'>Всього оголошень: <span>6</span></p>
        </div>
    )
}