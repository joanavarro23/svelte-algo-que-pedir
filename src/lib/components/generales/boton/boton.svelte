<script lang="ts">
  import './boton.css'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  
  interface PropsButton extends HTMLButtonAttributes {
    tipo: 'icono' | 'primario' | 'secundario'
    nombre: Snippet
  }
  const { tipo = 'primario', nombre, ...rest }: PropsButton = $props()
</script>

<button class={`boton-${tipo}`} {...rest}>
  {@render nombre()}
</button>