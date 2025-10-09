import axios from 'axios'
import { error } from '@sveltejs/kit'

export async function getLocal() {
  try {
    const response = await axios.get('http://localhost:9000/local') // URL del backend
    return response.data
  } catch (err) {
    // Lanza un error que SvelteKit interpretará como HTTP 404
    throw error(404, 'Local not found' + err)
  }
}


