<script lang="ts">
  import './boton.css'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  
  interface PropsButton extends HTMLButtonAttributes {
    tipo?: 'primario' | 'secundario'
    nombre: string
  }
  const { tipo = 'primario', nombre, ...rest }: PropsButton = $props()
</script>

<button class={`boton-${tipo}`} {...rest}>
  {nombre}
</button>