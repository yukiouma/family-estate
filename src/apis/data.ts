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
  const { data } = await client.get(`/data/category${tagId ? `?tag_id=${tagId}` : ''}`)
  return data.data
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
