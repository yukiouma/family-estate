export function moneyDisplay(n: number): string {
  const source = n.toString().split('.')
  let float = ''
  if (source.length === 1) {
    float = '00'
  } else {
    if (source[1].length === 1) {
      float = `${source[1]}0`
    } else {
      float = source[1].slice(0, 2)
    }
  }
  const decimal: string[] = []
  let times = 0
  Array.from(source[0])
    .reverse()
    .forEach((n: string) => {
      if (times === 3) {
        decimal.unshift(',')
        times = 0
      }
      decimal.unshift(n)
      times += 1
    })
  return `￥${decimal.join('')}.${float}`
}

export function changeDisplay(n: number): string {
  return `(${n >= 0 ? '+' : ''}${(n * 100).toFixed(2)}%)`
}
