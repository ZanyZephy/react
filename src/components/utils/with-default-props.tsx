export function mergeProps(...items: any[]) {
  const ret: any = {}
  items.forEach(item => {
    if (item) {
      Object.keys(item).forEach(key => {
        if (item[key] !== undefined) {
          ret[key] = item[key]
        }
      })
    }
  })
  return ret
}