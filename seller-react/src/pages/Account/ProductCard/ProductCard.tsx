import './product-card.scss'

export const ProductCard = () => {
    return (
        <div className='account-product-card'>
            <input type='checkbox' className='checkbox'/>
            <div className='account-product-card__info'>
                <div className='account-product-card__content'>
                    <img alt='Фото' src='Rectangle53.png' className='account-product-card__image'/>
                    <div className='account-product-card__text'>
                        <h3>Shimano stradic 19 2000s</h3>
                        <p>
                            Хобі, відпочинок і спорт
                            Спорт / відпочинок
                            Полювання / риболовля
                        </p>
                        <p>
                            Черняхів, Житомирська область
                        </p>
                        <p>
                            06.01.2024-06.01.2024
                        </p>
                        <h3 className='account-product-card__price'>4000грн</h3>
                        <hr/>
                    </div>
                </div>
                <div className='account-product-card__buttons'>
                    <button className='button account-product-card__button-edit'>Редагувати</button>
                    <button className='button account-product-card__button-delete'>Деактивувати</button>
                </div>
            </div>
        </div>
    )
}