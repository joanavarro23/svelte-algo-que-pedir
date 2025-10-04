<script lang='ts'>
  import './ingrediente-row.css'
  import type { Snippet } from 'svelte'
  import type { Ingrediente } from '$lib/types'
  import cow from '$lib/assets/cow.svg'
  import palta from '$lib/assets/palta.svg'

import eye from '$lib/assets/eye.svg'
import pencil from '$lib/assets/pencil-simple.svg'
import trash from '$lib/assets/trash.svg'

type IngredienteRowProps = {
  ingrediente: Ingrediente,
  columnasExtra?: Snippet<[]>,
  acciones?: Snippet<[Ingrediente]>
}

let { ingrediente, columnasExtra, acciones }: IngredienteRowProps = $props()

const mapaIconos = {vegetal: palta, animal: cow }
const iconoOrigen = mapaIconos[ingrediente.origen]
</script>

<tr>
  <td>{ingrediente.nombre}</td>
  
  {#if columnasExtra}
    {@render columnasExtra()}
    <!-- <td>{ingrediente.costo}</td> -->
  {/if}
  
  <td>{ingrediente.grupo}</td>
  <!-- <td class="celda-alimenticio">{ingrediente.grupo}</td> -->
   
  <td class="icono"><img src={iconoOrigen} alt="palta"></td>
  <!-- arriba: class="icono-origen" -->

  {#if acciones}
    <td>
      {@render acciones(ingrediente)}
      <!-- <div class="iconos-acciones">
        <img src={eye} alt="ojo" class="icono-ojo">
        <a href={`./editar-ingrediente/${ingrediente.id}`}>
          <img src={pencil} alt="lapiz">
        </a>
        <img src={trash} alt="tacho">
      </div> -->
    </td>  
  {:else} <!-- sino por defecto dejamos el tacho -->
    <td class="icono">
      <img src={trash} alt="eliminar">
      <!-- <button class="boton-icono" type="button" aria-label="Eliminar">
          <img src="assets/trash.svg" alt="">
      </button> -->
    </td>
  {/if}
</tr>