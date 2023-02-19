import { toBins } from '../src/binning'

describe('toBin', () => {
  it('should create bins correctly with even bin size', () => {
    const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const binSize = 4
    const bins = toBins(sample, binSize)

    expect(bins.length).toBe(binSize)
    expect(bins[0].item.value).toBe(1)
    expect(bins[1].item.value).toBe(3.25)
    expect(bins[2].item.value).toBe(5.5)
    expect(bins[3].item.value).toBe(7.75)
    expect(bins[0].values).toEqual(expect.arrayContaining([1, 2, 3]))
    expect(bins[1].values).toEqual(expect.arrayContaining([4, 5]))
    expect(bins[2].values).toEqual(expect.arrayContaining([6, 7]))
    expect(bins[3].values).toEqual(expect.arrayContaining([8, 9, 10]))
  })

  it('should create bins correctly with odd bin size', () => {
    const sample = [5, 10, 11, 13, 15, 35, 50, 55, 72, 92, 204, 215]
    const binSize = 3
    const bins = toBins(sample, binSize)

    expect(bins.length).toBe(binSize)
    expect(bins[0].item.value).toBe(5)
    expect(bins[1].item.value).toBe(75)
    expect(bins[2].item.value).toBe(145)
    expect(bins[0].values).toEqual(
      expect.arrayContaining([5, 10, 11, 13, 15, 35, 50, 55, 72])
    )
    expect(bins[1].values).toEqual(expect.arrayContaining([92]))
    expect(bins[2].values).toEqual(expect.arrayContaining([204, 215]))
  })

  it('should create bins with labels correctly', () => {
    const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const binSize = 4
    const labels = ['a', 'b', 'c', 'd']
    const bins = toBins(sample, binSize, labels)
    expect(bins.length).toBe(binSize)
    expect(bins[0].item.label).toBe('a')
    expect(bins[1].item.label).toBe('b')
    expect(bins[2].item.label).toBe('c')
    expect(bins[3].item.label).toBe('d')
  })

  it('should throw an error if bin size is greater than or equal to sample length', () => {
    const sample = [1, 2, 3]
    const binSize = 3
    expect(() => toBins(sample, binSize)).toThrow(RangeError)
    expect(() => toBins(sample, 4)).toThrow(RangeError)
  })
})
