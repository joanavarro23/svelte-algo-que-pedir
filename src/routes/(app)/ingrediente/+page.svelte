<script lang='ts'>

  import '$lib/styles/tablas.css'
  import '$lib/components/ingredientes/ingredientes.css'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'
  import { ingredientes } from '$lib/components/ingredientes/ingredientes'

</script>

<main class="ingrediente-container main-vista">
        <header class="boton-titulo">
            <h1>Ingredientes</h1>
            <Boton onclick={()=>{
          
            }} nombre= "Nuevo Ingrediente"/>
        </header>
        <section class="contenedor-tabla"> <!-- Sin este section no me pone los bordes -->
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Costo</th>
                        <th class="cabecera-alimenticio">Grupo alimenticio</th>
                        <th class="cabecera-origen">Origen</th>
                        <th class="cabecera-acciones">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#each ingredientes as ingrediente (ingrediente.id)}
                        <IngredienteRow {ingrediente} />
                    {/each}
                </tbody>
            </table>
        </section>
    </main> 