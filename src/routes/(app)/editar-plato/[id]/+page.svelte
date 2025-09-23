<script>
  import './editar-plato.css'
  import hamburguesa from '$lib/assets/hamburguesa-preview.jpg'
  import { page } from '$app/state'

  // Componentes
  import Input from '$lib/components/generales/input/input.svelte'
  import Switch from '$lib/components/generales/switch/switch.svelte'
  //   import Boton from '$lib/components/generales/boton/boton.svelte'
  
  // Lista de ingredientes
  import { ingredientes } from '$lib/components/ingredientes/ingredientes'
  import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'
  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'

  let nombre = $state('Hamburguesa completa con cheddar')
  let descripcion = $state('Breve descripción de los ingredientes o preparación del plato')
  let imagen = $state(hamburguesa)
</script>

{#snippet nombreColumnas()}
    <th>Nombre</th>
    <th>Grupo</th>
    <th class="icono">Origen</th>
    <th class="icono">Acciones</th>
{/snippet}
{#snippet datosFilas()}
    {#each ingredientes as ingrediente (ingrediente.id)}
        <IngredienteRow {ingrediente} editarPlato={true} />
    {/each}
{/snippet}

<main class="main-vista vista-editar-plato">
    <h1 class="titulo">Editar Plato {page.params.id}</h1>

    <!-- Descripción del plato -->
    <section class="contenedor-general editar-plato">
        <form>
            <Input nombre_label="Nombre del plato*" type="text" id="nombre"
            bind:value={nombre} maxlength={30} placeholder="Ej: Hamburguesa completa con cheddar"/>

            <Input id="descripcion" nombre_label="Descripcion*" textarea={true}
            bind:value={descripcion} type=""/>

            <Input nombre_label="URL de la imagen del plato*" type="file" id="imagen"
            accept="image/jpeg,image/jpg,image/png" bind:value={imagen} />
        </form>
        
        <!-- Imagen de referencia -->
        <div class="editar-plato__imagen">
            <img class="foto" src={hamburguesa} alt="Vista previa del plato">
        </div>
    </section> 

    <!-- Costos del plato -->
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Costos</h2>
        <form class="costos-plato">
            <Input nombre_label="Precio Base*" type="number" id="precio" placeholder="Ej: 500" />
            <Switch id="platoDeAutor" titulo="Plato de Autor" 
            subtitulo="Aplica un porcentaje adicional al precio de venta" />
            <Switch id="platoDePromocion" titulo="Plato en Promoción"
            subtitulo="Aplica un descuento al precio de venta" />
        </form>
    </section>

    <!-- Detalle de los ingredientes --> 
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Ingredientes</h2>
        <div class="contenedor_titulo-span">
            <h3 class="subtitulo">Costo de producción</h3><span>$ 100</span>
        </div>

        <Tabla {nombreColumnas} {datosFilas} />
    </section>
</main>