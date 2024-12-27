import { client } from './client'

export async function listStatistic() {
  const reply = await client.get('/statistic')
  // const data = [
  //   {
  //     id: 1,
  //     label: '现金流',
  //     total: 1000000,
  //     byTag: [
  //       { id: 1, name: 'yuki', amount: 100 },
  //       { id: 2, name: 'malney', amount: 900 }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     label: '现金流(含公积金)',
  //     total: 2000,
  //     byTag: [
  //       { id: 1, name: 'yuki', amount: 100 },
  //       { id: 2, name: 'malney', amount: 1900 }
  //     ]
  //   }
  // ]
  return reply.data.data
}

export async function getStatistic(id: number) {
  const reply = await client.get(`/statistic/${id}`)
  // const data = {
  //   id: 1,
  //   name: '现金流',
  //   categories: [
  //     { id: 1, name: '现金' },
  //     { id: 2, name: '公积金' }
  //   ]
  // }
  console.log(reply)
  return reply.data.data
}

export async function addStatistic(statistic: { name: string; categories: number[] }) {
  await client.post('/statistic', statistic)
}

export async function removeStatistic(id: number) {
  await client.delete(`/statistic/${id}`)
}

export async function modifyStatistic(id: number, name: string) {
  await client.put(`/statistic/${id}`, { name })
}
