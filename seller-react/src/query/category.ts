import Axios from "../Axios.ts"
import { useQuery } from "@tanstack/react-query"

export interface Category {
  id: number
  name: string
  image?: []
  parentId?: number
}
export const getAllCategories = async (): Promise<Category[]> => {
  const response = await Axios.get("/category/getAll")
  return response.data
}

export const getSubCategoriesByCategoryId = async (
  parentId: number,
): Promise<Category[]> => {
  const response = await Axios.get(
    `/category/getCategoriesByParentId/${parentId}`,
  )
  return response.data
}

export const useGetSubCategoriesByCategoryId = (categoryId: number) => {
  return useQuery<Category[]>({
    queryKey: [`getSubCategoriesByCategoryId-${categoryId}}`],
    queryFn: () => getSubCategoriesByCategoryId(categoryId),
    staleTime: 1000 * 60 * 5,
  })
}
export const useGetAllCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  })
}
