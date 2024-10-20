export async function listTags(): Promise<{ id: number; name: string }[]> {
  const data = [
    { id: 1, name: 'malney' },
    { id: 2, name: 'yuki' }
  ]
  return data
}

export async function addTag(tag: string) {
  console.log(`executing addTag(${tag})`)
}

export async function removeTag(id: number) {
  console.log(`executing removeTag(${id})`)
}

export async function modifyTag(tag: { id: number; name: string }) {
  console.log(`executing modifyTag(${tag})`)
}
