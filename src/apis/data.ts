export async function listSubCategoryData(
  tagId: number
): Promise<{ id: number; categoryId: number; subCategory: string; value: number }[]> {
  const dummyData = [
    [
      { id: 0, categoryId: 1, subCategory: '活期存款', value: 300000 },
      { id: 0, categoryId: 2, subCategory: '汽车', value: 300000 },
      { id: 0, categoryId: 2, subCategory: '房子', value: 300000 },
      { id: 0, categoryId: 3, subCategory: '基金', value: 300000 },
      { id: 0, categoryId: 3, subCategory: '债券', value: 300000 },
      { id: 0, categoryId: 5, subCategory: '房贷', value: 300000 }
    ],
    [
      { id: 7, categoryId: 1, subCategory: '活期存款', value: 200000 },
      { id: 8, categoryId: 2, subCategory: '汽车', value: 200000 },
      { id: 9, categoryId: 2, subCategory: '房子', value: 200000 },
      { id: 10, categoryId: 3, subCategory: '基金', value: 200000 },
      { id: 11, categoryId: 3, subCategory: '债券', value: 200000 },
      { id: 12, categoryId: 5, subCategory: '房贷', value: 200000 }
    ],
    [
      { id: 1, categoryId: 1, subCategory: '活期存款', value: 100000 },
      { id: 2, categoryId: 2, subCategory: '汽车', value: 100000 },
      { id: 3, categoryId: 2, subCategory: '房子', value: 100000 },
      { id: 4, categoryId: 3, subCategory: '基金', value: 100000 },
      { id: 5, categoryId: 3, subCategory: '债券', value: 100000 },
      { id: 6, categoryId: 5, subCategory: '房贷', value: 100000 }
    ]
  ]
  return dummyData[tagId]
}

export async function listCategoryData(
  tagId: number
): Promise<{ categoryId: number; categoryName: string; value: number }[]> {
  const dummyData = [
    [
      { categoryId: 1, categoryName: '流动资金', value: 300000 },
      { categoryId: 2, categoryName: '固定资产', value: 600000 },
      { categoryId: 3, categoryName: '投资理财', value: 600000 },
      { categoryId: 4, categoryName: '应收款', value: 0 },
      { categoryId: 5, categoryName: '负债', value: 300000 }
    ],
    [
      { categoryId: 1, categoryName: '流动资金', value: 200000 },
      { categoryId: 2, categoryName: '固定资产', value: 400000 },
      { categoryId: 3, categoryName: '投资理财', value: 400000 },
      { categoryId: 4, categoryName: '应收款', value: 0 },
      { categoryId: 5, categoryName: '负债', value: 200000 }
    ],
    [
      { categoryId: 1, categoryName: '流动资金', value: 100000 },
      { categoryId: 2, categoryName: '固定资产', value: 200000 },
      { categoryId: 3, categoryName: '投资理财', value: 200000 },
      { categoryId: 4, categoryName: '应收款', value: 0 },
      { categoryId: 5, categoryName: '负债', value: 100000 }
    ]
  ]
  return dummyData[tagId]
}

export async function createData(data: {
  categoryId: number
  subCategoryId: number
  value: number
  tagId: number
}) {
  console.log(`createData(${data})`)
}

export async function updateData(id: number, value: number) {
  console.log(`updateData(${id}, ${value})`)
}

export async function removeData(id: number) {
  console.log(`removeData(${id})`)
}
