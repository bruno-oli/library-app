function shallowComparison(
  obj1: object,
  obj2: object,
  ignoredProperties: string[] = [],
) {
  return (
    Object.keys(obj1).filter((key) => !ignoredProperties.includes(key))
      .length ===
      Object.keys(obj2).filter((key) => !ignoredProperties.includes(key))
        .length &&
    (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
      if (ignoredProperties.includes(key)) {
        return true
      }
      return (
        Object.prototype.hasOwnProperty.call(obj2, key) &&
        obj1[key] === obj2[key]
      )
    })
  )
}

export { shallowComparison }
