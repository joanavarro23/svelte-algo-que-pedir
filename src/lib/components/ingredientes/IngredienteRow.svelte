<script lang='ts'>
  import './ingrediente-row.css'
  import type { Snippet } from 'svelte'
  import { Ingrediente } from '$lib/models/ingrediente.svelte'
  import IconoBoton from '../generales/icono boton/iconoBoton.svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'
  
  import cow from '$lib/assets/cow.svg'
  import palta from '$lib/assets/palta.svg'
  import trash from '$lib/assets/trash.svg'

type IngredienteRowProps = SvelteHTMLElements['tr'] & {
  ingrediente: Ingrediente,
  columnasExtra?: Snippet<[]>,
  acciones?: Snippet<[Ingrediente]>
}

let { ingrediente, columnasExtra, acciones, ...trAtributos }: IngredienteRowProps = $props()

const mapaIconos = {vegetal: palta, animal: cow }
const iconoOrigen = mapaIconos[ingrediente.origen]
</script>

<tr {...trAtributos}>
  <td data-testid={'nombre-'+ingrediente.id}>{ingrediente.nombre}</td>
  
  {#if columnasExtra}
    {@render columnasExtra()}
  {/if}
  
  <td class="celda-alimenticio" data-testid={'grupo-'+ingrediente.id}>{ingrediente.grupo}</td>

  <td class="icono-origen" data-testid={'origen-'+ingrediente.id}><img src={iconoOrigen} alt="palta"></td>

  {#if acciones}
    <td>
      {@render acciones(ingrediente)}
    </td>  
  {:else} <!-- sino por defecto dejamos el tacho -->
    <td class="icono-accion">
      <IconoBoton> <!-- Acá debería la función para borrar ingrediente de la LISTA de PLATOS -->
        <img src={trash} alt="eliminar">
      </IconoBoton>
    </td>
  {/if}
</tr>