<script lang='ts'>
import '$lib/components/ingredientes/ingredientes.css'
import Boton from '$lib/components/generales/boton/boton.svelte'
import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'
import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
import { ingredientes } from '$lib/components/ingredientes/ingredientes'

</script>

{#snippet nombreColumnas()}
  <th>Nombre</th>
  <th>Costo</th>
  <th class="cabecera-alimenticio">Grupo alimenticio</th>
  <th class="cabecera-origen">Origen</th>
  <th class="cabecera-acciones">Acciones</th>
{/snippet}

{#snippet datosFilas()}
  {#each ingredientes as ingrediente (ingrediente.id)}
    <IngredienteRow {ingrediente} />
  {/each}
{/snippet}


<main class="ingrediente-container main-vista">
    <header class="boton-titulo">
        <h1>Ingredientes</h1>
        <Boton onclick={()=>{
        
        }} nombre="Nuevo Ingrediente" />
    </header>
    <Tabla {nombreColumnas} {datosFilas}/>
</main> 