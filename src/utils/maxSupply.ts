export function maxSupply(value: number | null | undefined): string {
  if (value == null) return '\u221E'
  return value.toLocaleString()
}

export default maxSupply
