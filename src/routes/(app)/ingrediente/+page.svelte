<script lang='ts'>
import Boton from '$lib/components/generales/boton/boton.svelte'
import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'
import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
import { INGREDIENTES_MOCK } from '$lib/data/mocks/ingredientesMock'
  import { goto } from '$app/navigation'

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
    <IngredienteRow {ingrediente} editarPlato={false}/>
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