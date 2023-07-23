export function getRandomEntryFromArray<T>(array: T[]) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export function getUniqueArrayEntries<T>(array1: T[], array2: T[] ): T[] {
  return array1.filter(entry => !array2.some(item => JSON.stringify(item) === JSON.stringify(entry)))
}
