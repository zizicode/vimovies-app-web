/**
 * Formatea un número a una representación abreviada (ej: 1500 → "1.5k")
 * @param num - El número a formatear
 * @param locale - El locale para el formato (default: 'es-ES')
 * @returns El número formateado como string
 */
export function formatNumber(num: number, locale: string = 'es-ES'): string {
  if (num === 0) return '0'
  if (num < 0) return `-${formatNumber(Math.abs(num), locale)}`

  const absNum = Math.abs(num)

  // Menos de 1,000: mostrar el número completo
  if (absNum < 1000) {
    return new Intl.NumberFormat(locale).format(num)
  }

  // 1,000 - 999,999: mostrar como "1k", "150k", etc.
  if (absNum < 1000000) {
    const thousands = num / 1000
    const formatted = thousands % 1 === 0 
      ? Math.floor(thousands) 
      : thousands.toFixed(1).replace(/\.0$/, '')
    return `${formatted}k`
  }

  // 1,000,000 - 999,999,999: mostrar como "1M", "1.5M", etc.
  if (absNum < 1000000000) {
    const millions = num / 1000000
    const formatted = millions % 1 === 0 
      ? Math.floor(millions) 
      : millions.toFixed(1).replace(/\.0$/, '')
    return `${formatted}M`
  }

  // 1,000,000,000 o más: mostrar como "1B", "1.5B", etc.
  const billions = num / 1000000000
  const formatted = billions % 1 === 0 
    ? Math.floor(billions) 
    : billions.toFixed(1).replace(/\.0$/, '')
  return `${formatted}B`
}

/**
 * Formatea un número con el símbolo "+" adelante (ej: 1500 → "+1.5k")
 * @param num - El número a formatear
 * @param locale - El locale para el formato (default: 'es-ES')
 * @returns El número formateado con "+" como string
 */
export function formatNumberWithPlus(num: number, locale: string = 'es-ES'): string {
  return `+${formatNumber(num, locale)}`
}

/**
 * Formatea un número con separadores de miles (ej: 1500 → "1,500")
 * @param num - El número a formatear
 * @param locale - El locale para el formato (default: 'es-ES')
 * @returns El número formateado con separadores
 */
export function formatNumberWithCommas(num: number, locale: string = 'es-ES'): string {
  return new Intl.NumberFormat(locale).format(num)
}
