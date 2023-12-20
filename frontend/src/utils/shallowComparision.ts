function shallowComparison<T extends object>(
  obj1: T,
  obj2: T,
  ignoredProperties: Array<keyof T> = [],
) {
  const keys1 = Object.keys(obj1) as Array<keyof T>
  const keys2 = Object.keys(obj2) as Array<keyof T>

  return (
    keys1.filter((key) => !ignoredProperties.includes(key)).length ===
      keys2.filter((key) => !ignoredProperties.includes(key)).length &&
    keys1.every((key) => {
      const typedKey = key as keyof T
      if (ignoredProperties.includes(typedKey)) {
        return true
      }
      return (
        Object.prototype.hasOwnProperty.call(obj2, typedKey) &&
        obj1[typedKey] === obj2[typedKey]
      )
    })
  )
}

export { shallowComparison }
