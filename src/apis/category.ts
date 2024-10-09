export async function listCategories(): Promise<{ id: number; name: string }[]> {
  return [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' },
    { id: 5, name: 'E' }
  ]
}

export async function listSubCategories(
  categoryId: number
): Promise<{ id: number; name: string }[]> {
  return [
    { id: 1, name: `A${categoryId}` },
    { id: 2, name: `B${categoryId}` },
    { id: 3, name: `C${categoryId}` },
    { id: 4, name: `D${categoryId}` },
    { id: 5, name: `E${categoryId}` }
  ]
}
