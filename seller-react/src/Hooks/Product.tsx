import Axios from "../Axios.ts"
import { useCallback, useState } from "react"

export type Product = {
  name: string
  productId: number
  productName: string
  price: number
  cityName: string
  regionName: string
  mainImage?: string
  createdAt: string
  categoryName?: string
  description: string
  status: Status
}

export type ProductImage = {
  image: string
}

interface SearchCriteria {
  productName?: string
  cityName?: string
  regionName?: string
  category?: string
  priceFrom?: number
  priceTo?: number
  pageNumber: number
  countProductsOnPage: number
}

export enum Status {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
  REJECTED = "REJECTED",
}

export enum SortField {
  PRICE = "price",
  PRODUCT_NAME = "productName",
  CREATED_AT = "createdAt",
}
export enum SortDirection {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

export const useProduct = () => {
  const [productsStartsWith, setProductsStartsWith] = useState<Product[]>([])

  const [products, setProducts] = useState<Product[]>([])

  const [productsByUserId, setProductsByUserId] = useState<Product[]>([])

  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const [images, setImages] = useState<ProductImage[]>([])
  const [countProducts, setCountProducts] = useState(0)

  // returns all products if the function has no parameters
  const searchProductsByCriteria = useCallback((criteria: SearchCriteria) => {
    setIsLoadingProducts(true)
    Axios.get(`/product/searchProductsByCriteria`, {
      params: {
        productName: criteria.productName || null,
        cityName: criteria.cityName || null,
        regionName: criteria.regionName || null,
        category: criteria.category || null,
        priceFrom: criteria.priceFrom === -1 ? null : criteria.priceFrom,
        priceTo: criteria.priceTo === -1 ? null : criteria.priceTo,
        pageNumber: criteria.pageNumber || 1,
        countProductsOnPage: criteria.countProductsOnPage || 5,
      },
    })
      .then((res) => {
        setProductsStartsWith(res.data)
        setProducts(res.data)
      })
      .catch((err) => {
        throw err
      })
      .finally(() => {
        setIsLoadingProducts(false)
      })
  }, [])

  const getCountOfProducts = (criteria: SearchCriteria) => {
    Axios.get(`/product/countProducts`, {
      params: {
        productName: criteria.productName || null,
        cityName: criteria.cityName || null,
        regionName: criteria.regionName || null,
        category: criteria.category || null,
        priceFrom: criteria.priceFrom === -1 ? null : criteria.priceFrom,
        priceTo: criteria.priceTo === -1 ? null : criteria.priceTo,
      },
    })
      .then((res) => {
        setCountProducts(res.data)
      })
      .catch((err) => {
        throw err
      })
  }

  const getProductsByUserId = useCallback(
    (
      userId: number,
      status: Status,
      productName?: string,
      categoryName?: string,
      sortBy?: SortField | null,
      sortDirection?: SortDirection | null,
    ) => {
      setIsLoadingProducts(true)
      Axios.get(`/product/getProductsByUserId`, {
        params: {
          userId: userId,
          status: status.toUpperCase(),
          productName: productName || null,
          categoryName: categoryName || null,
          sortBy: sortBy || SortField.PRODUCT_NAME,
          sortDirection: sortDirection || SortDirection.ASCENDING,
        },
      })
        .then((res) => {
          setProductsByUserId(res.data)
        })
        .catch((err) => {
          throw err
        })
        .finally(() => setIsLoadingProducts(false))
    },
    [],
  )

  const getProductById = useCallback((productId: number) => {
    Axios.get(`/product/getProductById/${productId}`)
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        throw err
      })
  }, [])

  const getImagesByProductId = (productId: number) => {
    Axios.get(`/product/getImagesByProductId/${productId}`)
      .then((res) => {
        setImages(res.data)
      })
      .catch((err) => {
        throw err
      })
  }

  return {
    searchProductsByCriteria,
    productsStartsWith,
    products,
    getProductsByUserId,
    getProductById,
    getImagesByProductId,
    images,
    isLoadingProducts,
    productsByUserId,
    getCountOfProducts,
    countProducts,
  }
}
