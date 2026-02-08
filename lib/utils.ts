import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRUT(rut: string): string {
  if (!rut) return ""
  let value = rut.replace(/\./g, "").replace("-", "")
  if (value.length <= 1) return value

  let dv = value.slice(-1)
  let rest = value.slice(0, -1)

  return rest.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv
}

export function validateRUT(rut: string): boolean {
  if (!rut) return false
  let cleanRut = rut.replace(/\./g, "").replace("-", "")
  if (cleanRut.length < 8) return false

  let dv = cleanRut.slice(-1).toLowerCase()
  let num = parseInt(cleanRut.slice(0, -1))

  let i = 2
  let sum = 0
  while (num > 0) {
    sum += (num % 10) * i
    num = Math.floor(num / 10)
    i = i === 7 ? 2 : i + 1
  }

  let expectedDv = 11 - (sum % 11)
  let expectedDvStr = expectedDv === 11 ? "0" : expectedDv === 10 ? "k" : expectedDv.toString()

  return dv === expectedDvStr
}
