export async function listCategories(): Promise<{ id: number; name: string }[]> {
  return [
    { id: 1, name: "流动资金" },
    { id: 2, name: "固定资产", },
    { id: 3, name: "投资理财" },
    { id: 4, name: "应收款" },
    { id: 5, name: "负债" },
  ]
}

export async function listSubCategories(
  categoryId: number
): Promise<{ id: number; name: string }[]> {
  switch (categoryId) {
    case 1:
      return [{ id: 1, name: "活期存款" }, { id: 2, name: "余额宝" }];
    case 2:
      return [{ id: 3, name: "房产" }, { id: 4, name: "汽车" }];
    case 3:
      return [{ id: 5, name: "基金" }, { id: 6, name: "股票" }];
    case 4:
      return [{ id: 7, name: "公积金" },];
    case 5:
      return [{ id: 8, name: "房贷" }];
    default:
      return [];
  }
}
