export async function listCategories(): Promise<{ id: number; name: string }[]> {
  return [
    { id: 1, name: '流动资金' },
    { id: 2, name: '固定资产' },
    { id: 3, name: '投资理财' },
    { id: 4, name: '应收款' },
    { id: 5, name: '负债' }
  ]
}

export async function listCategoryWithSub(): Promise<
  { id: number; name: string; subCategory: { id: number; name: string }[] }[]
> {
  return [
    {
      id: 1,
      name: '流动资金',
      subCategory: [
        { id: 10, name: '活期' },
        { id: 13, name: '余额宝' }
      ]
    },
    { id: 2, name: '固定资产', subCategory: [{ id: 11, name: '汽车' }] },
    { id: 3, name: '投资理财', subCategory: [{ id: 12, name: '基金' }] },
    { id: 4, name: '应收款', subCategory: [] },
    { id: 5, name: '负债', subCategory: [{ id: 14, name: '信用卡' }] }
  ]
}

export async function listSubCategories(
  categoryId: number
): Promise<{ id: number; name: string }[]> {
  switch (categoryId) {
    case 1:
      return [
        { id: 1, name: '活期存款' },
        { id: 2, name: '余额宝' }
      ]
    case 2:
      return [
        { id: 3, name: '房产' },
        { id: 4, name: '汽车' }
      ]
    case 3:
      return [
        { id: 5, name: '基金' },
        { id: 6, name: '股票' }
      ]
    case 4:
      return [{ id: 7, name: '公积金' }]
    case 5:
      return [{ id: 8, name: '房贷' }]
    default:
      return []
  }
}

export async function addCategory(name: string) {
  console.log(`addCategory(${name})`)
}

export async function addSubCategory(mainCategoryId: number, name: string) {
  console.log(`addSubCategory(${mainCategoryId}, ${name})`)
}

export async function modifyCategory(category: { id: number; name: string }) {
  console.log(`modifyCategory(${category})`)
}

export async function removeCategory(id: number) {
  console.log(`removeCategory(${id})`)
}

export async function removeSubCategory(id: number) {
  console.log(`removeSubCategory(${id})`)
}
