export function formatSize(value) {
  let unit, size

  if (Math.log10(value) < 3) {
    unit = 'B'
    size = value
  } else if (Math.log10(value) < 6) {
    unit = 'kB'
    size = value / 1024
  } else {
    unit = 'mB'
    size = value / 1024 / 1024
  }

  return { unit: unit, size: size.toFixed(2) }
}