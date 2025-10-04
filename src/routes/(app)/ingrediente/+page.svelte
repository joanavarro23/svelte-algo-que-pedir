<script lang='ts'>
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'
  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
  import { INGREDIENTES_MOCK } from '$lib/data/mocks/ingredientesMock'
  import { goto } from '$app/navigation'
  
  import eye from '$lib/assets/eye.svg'
  import pencil from '$lib/assets/pencil-simple.svg'
  import trash from '$lib/assets/trash.svg'

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
        <td>{ingrediente.costo}</td>
      {/snippet}
      {#snippet acciones()}
        <div class="iconos-acciones">
          <img src={eye} alt="ojo" class="icono-ojo">
          <a href={`./editar-ingrediente/${ingrediente.id}`}>
            <img src={pencil} alt="lapiz">
          </a>
          <img src={trash} alt="tacho">
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