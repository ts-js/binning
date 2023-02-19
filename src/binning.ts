/**
 * Structure of each bin
 */
export interface Bin {
  /**
   * Bin's label.
   */
  item: {
    value: number
    label?: string
  }

  /**
   * Values in a bin
   */
  values: number[]
}

/**
 * Array type of bins
 */
export type Bins = Bin[]

/**
 * Convert input sample array of numbers into bins.
 *
 * @param sample Sample input
 * @param binSize Number of bins
 * @param labels Optional labels for the bins
 */
export function toBins(data: number[], binSize: number, labels?: string[]) {
  const sampleCount = data.length

  if (binSize >= sampleCount) {
    throw new RangeError(
      `Bin size ${binSize} should be less than sample size: ${sampleCount}`
    )
  }

  // Sort data in descending order
  const sortedData = data.sort((lhs, rhs) => lhs - rhs)
  // Find min and max samples
  const minSample = sortedData[0]
  const maxSample = sortedData[sampleCount - 1]

  // Create equal spaced bins
  const binWidth = (maxSample - minSample) / binSize
  const bins: Bins = Array(binSize)
    .fill({ values: [] })
    .map((bin, i) => ({
      item: {
        value: minSample + binWidth * i,
        label: labels?.[i]
      },
      ...bin
    }))

  // Use binary search to determine indices of minimum and maximum
  // values for each bin
  let minIndex = 0
  let maxIndex = sampleCount - 1

  for (let i = 0; i < binSize; i++) {
    while (
      minIndex < sampleCount &&
      sortedData[minIndex] < bins[i].item.value
    ) {
      minIndex++
    }
    while (
      maxIndex >= 0 &&
      sortedData[maxIndex] > bins[i].item.value + binWidth
    ) {
      maxIndex--
    }
    for (let j = minIndex; j <= maxIndex; j++) {
      bins[i].values.push(sortedData[j])
    }

    bins[i].values = sortedData.slice(minIndex, maxIndex + 1)

    // Get the maxIndex ready for the next iteration.
    maxIndex = sampleCount - 1
  }

  return bins
}
