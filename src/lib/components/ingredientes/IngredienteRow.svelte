<script lang='ts'>
import type { Ingrediente } from './ingredientes'
import cow from '$lib/assets/cow.svg'
import palta from '$lib/assets/palta.svg'
import eye from '$lib/assets/eye.svg'
import pencil from '$lib/assets/pencil-simple.svg'
import trash from '$lib/assets/trash.svg'
  // import type { Snippet } from 'svelte'

type IngredienteRowProps = {
  ingrediente: Ingrediente,
  editarPlato: boolean
  // contenidoTabla: Snippet
}

let { ingrediente, editarPlato=false }: IngredienteRowProps = $props()
const mapaIconos = {vegetal: palta, animal: cow }
const iconoOrigen = mapaIconos[ingrediente.origen]

</script>

<tr>
  <td>{ingrediente.nombre}</td>
  <!-- {@render contenidoTabla()} -->
  {#if editarPlato}
    <td>{ingrediente.grupo}</td>
    <td class="icono"><img src={iconoOrigen} alt="palta"></td>
    <td class="icono">
      <img src={trash} alt="eliminar">
        <!-- <button class="boton-icono" type="button" aria-label="Eliminar">
            <img src="assets/trash.svg" alt="">
        </button> -->
    </td>
  {:else}
    <td>{ingrediente.costo}</td>
    <td class="celda-alimenticio">{ingrediente.grupo}</td>
    <td class="icono-origen">
      <img src={iconoOrigen} alt="palta" />
    </td>
    <td>
      <div class="iconos-acciones">
        <img src={eye} alt="ojo" class="icono-ojo">
        <a href={`./editar-ingrediente/${ingrediente.id}`}>
          <img src={pencil} alt="lapiz">
        </a>
        <img src={trash} alt="tacho">
      </div>
    </td>
  {/if}
</tr>

<style>
  @import './ingrediente-row.css';
</style>