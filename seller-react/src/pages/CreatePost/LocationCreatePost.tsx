import './location.scss'

export const LocationCreatePost = () => {
    return (
        <div className='white-block-mt20 white-block'>
            <h4>Місцезнаходження</h4>
            <form>
                <input type='text'
                       className='create-post-city'
                       placeholder='Назва міста й індекс'
                />
            </form>
        </div>
    )
}