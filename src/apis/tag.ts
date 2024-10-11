export async function listTags(): Promise<{ id: number; name: string }[]> {
  return [
    { id: 1, name: 'malney' },
    { id: 2, name: 'yuki' }
  ]
}
