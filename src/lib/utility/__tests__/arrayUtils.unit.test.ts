import { getUniqueArrayEntries } from '../arrayUtils'

describe('getUniqueArrayEntries', () => {
  it('should filter all entries from array1 that appear in array2', () => {
    const array1 = [
      {myProp1: 123},
      {myProp2: 7527527},
      {myProp3: 'uh53uh'},
    ]

    const array2 = [
      {myProp1: 24572457},
      {myProp2: 7527527},
      {myProp3: '35etuh35'},
    ]

    expect(getUniqueArrayEntries(array1, array2)).toStrictEqual([
      {myProp1: 123},
      {myProp3: 'uh53uh'},
    ])
  })
})
