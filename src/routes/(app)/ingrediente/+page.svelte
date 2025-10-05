<script lang='ts'>
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import IconoBoton from '$lib/components/generales/icono boton/iconoBoton.svelte'
  import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'
  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
  import { INGREDIENTES_MOCK } from '$lib/data/mocks/ingredientesMock'
  import { goto } from '$app/navigation'

  import eye from '$lib/assets/eye.svg'
  import pencil from '$lib/assets/pencil-simple.svg'
  import trash from '$lib/assets/trash.svg'

  const editar = (id) => { goto (`/editar-ingrediente/${id}`)}
</script>

{#snippet nombreColumnas()}
  <th>Nombre</th>
  <th>Costo</th>
  <th class="cabecera-alimenticio">Grupo alimenticio</th>
  <th class="cabecera-origen">Origen</th>
  <th class="cabecera-acciones">Acciones</th>
{/snippet}

{#snippet datosFilas()}
  {#each INGREDIENTES_MOCK as ingrediente (ingrediente.id)}
    <IngredienteRow {ingrediente}>
      {#snippet columnasExtra()}
        <td>${(ingrediente.costo).toFixed(2)}</td>
      {/snippet}
      {#snippet acciones()}
        <div class="iconos-acciones">
          <!-- AGREGAR ACCION PARA EL ICONO BOTON EYE -->
          <IconoBoton>
            <img src={eye} alt="ojo" class="icono-ojo">
          </IconoBoton>
          <IconoBoton onclick={() => editar(ingrediente.id)} >
            <img src={pencil} alt="lapiz">
          </IconoBoton>
          <!-- AGREGAR ACCION PARA EL ICONO BOTON TRASH -->
          <IconoBoton>
            <img src={trash} alt="tacho">
          </IconoBoton>
        </div>
      {/snippet}
    </IngredienteRow>
  {/each}
{/snippet}


<main class="ingrediente-container main-vista">
    <header class="boton-titulo">
        <h1>Ingredientes</h1>
        <Boton onclick={()=>{
          goto('./editar-ingrediente/nuevo')
        }} >Nuevo ingrediente</Boton>
    </header>
    <Tabla {nombreColumnas} {datosFilas}/>
</main> 

<style>
  @import './ingredientes.css';

  th {
    padding: 1rem;
  }
</style>