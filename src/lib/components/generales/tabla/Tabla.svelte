<script lang="ts">

  import type { Snippet } from 'svelte'
  import type { HTMLTableAttributes } from 'svelte/elements'

  interface PropsTabla extends HTMLTableAttributes {
    nombreColumnas: Snippet
    datosFilas: Snippet
  }

  let { nombreColumnas, datosFilas }: PropsTabla = $props()
</script>

<section class="contenedor-tabla"> <!-- Sin este section no me pone los bordes -->
  <table>
    <thead>
      <tr>
        {@render nombreColumnas()}
      </tr>
    </thead>
    <tbody>
      {@render datosFilas()}
    </tbody>
  </table>
</section>