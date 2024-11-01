import { client } from './client'

export async function listTags(): Promise<{ id: number; name: string }[]> {
  const { data } = await client.get('/tag')
  return data.data
}

export async function addTag(tag: string) {
  await client.post('/tag', { name: tag })
}

export async function removeTag(id: number) {
  await client.delete(`/tag/${id}`)
}

export async function modifyTag(tag: { id: number; name: string }) {
  await client.put(`/tag/${tag.id}`, { name: tag.name })
}
