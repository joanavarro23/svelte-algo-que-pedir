<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import './boton.css'
  interface Props extends HTMLButtonAttributes {
    tipo?: 'primario' | 'secundario'
    nombre: string
  }
  let { tipo = 'primario', nombre, ...rest }: Props = $props()
</script>

<button class="boton-{tipo}" {...rest}>{nombre}</button>
