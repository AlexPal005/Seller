import {useCallback, useContext, useEffect} from "react";
import {MainPageContext} from "../Main/Main.tsx";
import {Product} from "../../../Hooks/Product.tsx";
import './search-page-products.scss'
import {Link} from "react-router-dom";
import {Preloader} from "../../../components/Preloader/Preloader.tsx";
import {Pagination} from "../../../components/Pagination/Pagination.tsx";

export const SearchPageProducts = () => {
    const {
        products,
        isLoadingProducts,
        currPage,
        setCurrPage,
        countProductsOnPage,
        countProducts
    } = useContext(MainPageContext)

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    useEffect(() => {
        setTimeout(scrollToTop, 200)
    }, [currPage, scrollToTop])


    return (
        <div className='search-page-products'>
            {
                isLoadingProducts ? <Preloader/> :
                    <>
                        <h2 className='search-product-card__count'>Знайдено {`${countProducts}`} оголошень</h2>
                        {products.map(product => {
                            return (
                                <SearchProductCard product={product} key={product.productId}/>
                            )
                        })}
                        <Pagination
                            countProductsOnPage={countProductsOnPage}
                            countProducts={countProducts}
                            setCurrPage={setCurrPage}
                            currPage={currPage}
                        />
                    </>
            }
        </div>
    )
}

interface SearchProductCardProps {
    product: Product
}

const SearchProductCard = ({product}: SearchProductCardProps) => {

    return (
        <Link to={`/post/${product.productId}`} className='search-product-card'>
            <img alt={product.productName}
                 src={`data:image/jpeg;base64,${product.mainImage}`}
                 className='search-product-card__image'
            />
            <div className='search-product-card__info-block'>
                <p className='search-product-card__product-name'>{product.productName}</p>
                <p className='search-product-card__price'>{product.price} грн</p>
                <p>{product.cityName} - {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
        </Link>
    )
}