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

    const getAllCategories = useCallback(() => {
        Axios.get('/category/getAll').then(res => {
            setCategories(res.data)
        }).catch(err => {
            throw err
        })

    }, [])

    return {
        getAllCategories,
        categories
    }
}