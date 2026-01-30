export const validateEmail = (value: string) => {
  if (!value) return "El email es obligatorio"
  if (!/^\S+@\S+\.\S+$/.test(value)) return "Email no válido"
  return null
}