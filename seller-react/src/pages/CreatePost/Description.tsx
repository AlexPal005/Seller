import './description.scss'

export const Description = () => {
    return (
        <div className='create-post-description white-block'>
            <h4>Деталі оголошення</h4>

            <textarea
                className='create-post-description__text'
                placeholder='Подумайте, що б ви хотіли дізнатись з оголошення...'
            />
        </div>
    )
}