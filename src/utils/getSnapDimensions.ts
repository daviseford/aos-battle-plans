import { sortBy } from 'lodash'

/**
 * Given inches like 10.73, will give us the width or height necessary to snap to 10.75"
 * @param inches
 * @param conversionPercent
 */
export const getSnapDimensions = (inches: number, conversionPercent: number): number => {
  const flooredVal = Math.floor(inches)

  const lookup = {
    fromBottom: {
      from: inches - flooredVal,
      value: flooredVal,
    },
    fromQuarter: {
      from: Math.abs(inches - (flooredVal + 0.25)),
      value: flooredVal + 0.25,
    },
    fromHalf: {
      from: Math.abs(inches - (flooredVal + 0.5)),
      value: flooredVal + 0.5,
    },
    fromThreeQuarter: {
      from: Math.abs(inches - (flooredVal + 0.75)),
      value: flooredVal + 0.75,
    },
    fromTop: {
      from: Math.abs(inches - (flooredVal + 1)),
      value: flooredVal + 1,
    },
  }

  const snapWidthTo = sortBy(Object.keys(lookup), key => lookup[key].from)[0]
  return lookup[snapWidthTo].value / conversionPercent
}
