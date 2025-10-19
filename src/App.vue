<template>
  <div class="container">
    <h1>🏫 Sistema de Reservas Universitarias</h1>

    <div class="filtros">
      <input v-model="filtro" placeholder="Buscar por tipo (Aula, Cancha...)" />
      <label>
        <input type="checkbox" v-model="soloDisponibles" />
        Solo disponibles
      </label>
    </div>

    <div class="espacios">
      <div v-for="espacio in filtrados" :key="espacio.id" class="card">
        <h3>{{ espacio.name }}</h3>
        <p>Tipo: {{ espacio.type }}</p>
        <p>Capacidad: {{ espacio.capacity }}</p>
        <p>{{ espacio.available ? 'Disponible ✅' : 'Ocupado ❌' }}</p>
        <button @click="reservar(espacio)">Reservar</button>
      </div>
    </div>

    <div class="historial" v-if="historial.length">
      <h2>🕒 Historial de reservas</h2>
      <ul>
        <li v-for="(r, i) in historial" :key="i">
          {{ r.name }} — {{ new Date(r.date).toLocaleString() }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const espacios = ref([
  { id: 1, name: 'Aula 101', type: 'Aula', capacity: 40, available: true },
  { id: 2, name: 'Laboratorio 2', type: 'Laboratorio', capacity: 25, available: false },
  { id: 3, name: 'Cancha Principal', type: 'Cancha', capacity: 80, available: true }
])

const filtro = ref('')
const soloDisponibles = ref(false)
const historial = ref([])

const filtrados = computed(() =>
  espacios.value.filter(e => {
    const porTipo = e.type.toLowerCase().includes(filtro.value.toLowerCase())
    const porDisponibilidad = soloDisponibles.value ? e.available : true
    return porTipo && porDisponibilidad
  })
)

function reservar(espacio) {
  historial.value.unshift({
    ...espacio,
    date: new Date().toISOString()
  })
  alert(`✅ Reserva confirmada para ${espacio.name}`)
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f4f6f8;
  padding: 1rem;
}

.container {
  max-width: 800px;
  margin: auto;
}

.filtros {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.espacios {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
.historial {
  margin-top: 2rem;
}
</style>

