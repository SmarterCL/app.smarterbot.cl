/**
 * Validación de RUT chileno (DV calculado y formato)
 */
export function validateRUT(rut: string): boolean {
  // Formato esperado: "12.345.678-9" o "12345678-9" o "123456789"
  const cleaned = rut.replace(/\./g, "").replace(/-/g, "").trim()
  
  if (cleaned.length < 2) return false
  
  const body = cleaned.slice(0, -1)
  const dv = cleaned.slice(-1).toUpperCase()
  
  if (!/^\d+$/.test(body)) return false
  
  let sum = 0
  let multiplier = 2
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  
  const mod = 11 - (sum % 11)
  let expectedDV: string
  
  if (mod === 11) expectedDV = "0"
  else if (mod === 10) expectedDV = "K"
  else expectedDV = mod.toString()
  
  return dv === expectedDV
}

export function formatRUT(rut: string): string {
  const cleaned = rut.replace(/\./g, "").replace(/-/g, "").trim()
  if (cleaned.length < 2) return rut
  
  const body = cleaned.slice(0, -1)
  const dv = cleaned.slice(-1).toUpperCase()
  
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return `${formatted}-${dv}`
}
