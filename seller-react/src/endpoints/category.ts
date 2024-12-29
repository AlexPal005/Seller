import Axios from "../Axios.ts"

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
