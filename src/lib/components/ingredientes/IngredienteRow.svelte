<script lang='ts'>
  import './ingrediente-row.css'
  import type { Snippet } from 'svelte'
  import type { Ingrediente } from '$lib/models/ingrediente.svelte' 
  import IconoBoton from '../generales/icono boton/iconoBoton.svelte'
  
  import cow from '$lib/assets/cow.svg'
  import palta from '$lib/assets/palta.svg'
  import trash from '$lib/assets/trash.svg'

type IngredienteRowProps = {
  ingrediente: Ingrediente,
  columnasExtra?: Snippet<[]>,
  acciones?: Snippet<[Ingrediente]>
  eliminar?: () => void
}

let { ingrediente, columnasExtra, acciones, eliminar = () => {} }: IngredienteRowProps = $props()

const mapaIconos = {vegetal: palta, animal: cow }
const iconoOrigen = mapaIconos[ingrediente.origen]
</script>

<tr>
  <td>{ingrediente.nombre}</td>
  
  {#if columnasExtra}
    {@render columnasExtra()}
  {/if}
  
  <td class="celda-alimenticio">{ingrediente.grupo}</td>

  <td class="icono-origen"><img src={iconoOrigen} alt="palta"></td>

  {#if acciones}
    <td>
      {@render acciones(ingrediente)}
    </td>  
  {:else} <!-- sino por defecto dejamos el tacho -->
    <td class="icono-accion">
      <IconoBoton onclick={eliminar}>
        <img src={trash} alt="eliminar">
      </IconoBoton>
    </td>
  {/if}
</tr>