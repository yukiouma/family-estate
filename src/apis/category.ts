import { client } from './client'

export async function listCategories(): Promise<{ id: number; name: string }[]> {
  const { data } = await client.get('/category')
  return data.data
}

export async function listCategoryWithSub(): Promise<
  { id: number; name: string; subCategory: { id: number; name: string }[] }[]
> {
  const result = []
  const categories = await listCategories()
  for (const category of categories) {
    const { id, name } = category
    const subCategory = await listSubCategories(id)
    result.push({ id, name, subCategory })
  }
  return result
}

export async function listSubCategories(
  categoryId: number
): Promise<{ id: number; name: string }[]> {
  const { data } = await client.get(`/category/sub?category_id=${categoryId}`)
  return data.data
}

export async function addCategory(name: string) {
  await client.post('/category', { name })
}

export async function addSubCategory(mainCategoryId: number, name: string) {
  await client.post('/category/sub', { parent: mainCategoryId, name })
}

export async function modifyCategory(category: { id: number; name: string }) {
  await client.put(`/category/${category.id}`, { name: category.name })
}

export async function removeCategory(id: number) {
  await client.delete(`/category/${id}`)
}
