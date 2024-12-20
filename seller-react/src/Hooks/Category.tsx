import Axios from "../Axios.ts"
import {useCallback, useState} from "react";


export interface Category {
    id: number;
    name: string;
    image?: [];
    parentId?: number;
}

export function useCategory() {
    const [categories, setCategories] = useState<Category[]>([])
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
    const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false)
    const [subCategories, setSubCategories] = useState<Category[]>([])

    const getSubCategoriesByCategoryId = useCallback((parentId: number) => {
        Axios.get(`/category/getCategoriesByParentId/${parentId}`).then(res => {
            setSubCategories(res.data)
        }).catch(err => {
            throw err
        })

    }, [])

    const getAllCategories = useCallback(() => {
        setIsCategoriesLoading(true)
        Axios.get('/category/getAll').then(res => {
            setCategories(res.data)
        }).catch(err => {
            throw err
        }).finally(() => {
            setIsCategoriesLoading(false)
            setIsCategoriesLoaded(true)
        })

    }, [])

    return {
        getAllCategories,
        categories,
        getSubCategoriesByCategoryId,
        subCategories,
        isCategoriesLoading,
        isCategoriesLoaded
    }
}