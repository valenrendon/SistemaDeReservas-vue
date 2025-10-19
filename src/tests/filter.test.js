import { describe, it, expect } from 'vitest'

describe('Filtro por capacidad mínima', () => {
  it('debe filtrar correctamente los espacios', () => {
    const espacios = [
      { name: 'Aula 101', capacity: 40 },
      { name: 'Lab 2', capacity: 20 }
    ]
    const resultado = espacios.filter(e => e.capacity >= 30)
    expect(resultado.length).toBe(1)
  })
})
