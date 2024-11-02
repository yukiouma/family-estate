import { listCategories } from './category'
import { client } from './client'

export async function listSubCategoryData(
  tagId: number
): Promise<{ id: number; categoryId: number; subCategory: string; value: number }[]> {
  const { data } = await client.get(`/data${tagId ? `?tag_id=${tagId}` : ''}`)
  return data.data
}

export async function listCategoryData(
  tagId: number
): Promise<{ id: number; name: string; value: number }[]> {
  const categories = (await listCategories()).map((category) => {
    const { id, name } = category
    return { id, name, value: 0 }
  })
  const dataSet = new Map<number, number>(
    (await client.get(`/data/category${tagId ? `?tag_id=${tagId}` : ''}`)).data.data.map(
      (categoryData: any) => [categoryData.id, categoryData.value]
    )
  )
  for (let i = 0; i < categories.length; i++) {
    const id = categories[i].id
    const value = dataSet.get(id)
    categories[i].value = value ? value : 0
  }
  return categories
}

export async function createData(data: {
  categoryId: number
  subCategoryId: number
  value: number
  tagId: number
}) {
  const { categoryId, subCategoryId, value, tagId } = data
  await client.post('/data', { categoryId, subCategoryId, amount: value, tagId })
}

export async function updateData(id: number, value: number) {
  await client.put(`/data/${id}`, { amount: value })
}

export async function removeData(id: number) {
  await client.delete(`/data/${id}`)
}
