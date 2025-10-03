<script lang='ts'>
  import './editar-plato.css'
//   import { goto } from '$app/navigation'

  // Componentes
  import Input from '$lib/components/generales/input/input.svelte'
  import Textarea from '$lib/components/generales/input/textarea.svelte'
  import Switch from '$lib/components/generales/switch/switch.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
  import Validador from '$lib/utils/validador.svelte'

  // Lista de ingredientes
  import { INGREDIENTES_MOCK } from '$lib/data/mocks/ingredientesMock'
  import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'

  let { data } = $props()

  // Dinamismo para el titulo
  const titulo = $derived(
    // data.esNuevo ? 'Agregar nuevo plato' : 
    `Editar Plato ${data.plato.id}: ${data.plato?.nombre ?? ''}`
  )

  const guardar = () => {}
//   const descartar = () => { goto ('/menu') }
</script>

<main class="main-vista vista-editar-plato">
    <h1 class="titulo">{titulo}</h1>

    <!-- Descripción del plato -->
    <section class="contenedor-general editar-plato">
        <form>
            <Input data-testid="titulo" nombre_label="Nombre del plato*" type="text" id="nombre"
            bind:value={data.plato.nombre} maxlength={30} placeholder="Ej: Hamburguesa completa con cheddar"/>
            <Validador elemento={data.plato} atributo="titulo"/>

            <Textarea data-testid="descripcion" id="descripcion" nombre_label="Descripcion*" textarea={true}
            bind:value={data.plato.descripcion}/>
            <Validador elemento={data.plato} atributo="descripcion"/>

            <!-- <Input data-testid="imagen" nombre_label="URL de la imagen del plato*" type="file" id="imagen"
            accept="image/jpeg,image/jpg,image/png" bind:value={data.plato.imagen}/> -->
            <Input data-testid="imagen" nombre_label="URL de la imagen del plato*" type="text" id="imagen"
            bind:value={data.plato.imagen}/>
            <Validador elemento={data.plato} atributo="imagen"/>
        </form>

        <!-- Imagen de referencia -->
        <div class="editar-plato__imagen">
            <img class="foto" src={data.plato.imagen} alt="Vista previa del plato">
        </div>
    </section>

    <!-- Costos del plato -->
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Costos</h2>
        <form class="costos-plato">
            <Input data-testid="precio" nombre_label="Precio Base*" type="number" id="precio" 
            bind:value={data.plato.precio} placeholder="Ej: 500" min=0 />
            <Validador elemento={data.plato} atributo="precio"/>

            <Switch id="platoDeAutor" titulo="Plato de Autor" subtitulo="Aplica un porcentaje adicional al precio de venta" bind:checked={data.plato.platoDeAutor}/>
            <Switch id="platoDePromocion" titulo="Plato en Promoción" subtitulo="Aplica un descuento al precio de venta" bind:checked={data.plato.platoDePromocion}/>
        </form>
    </section>

    <!-- Detalle de los ingredientes  -->
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Ingredientes</h2>
        <div class="contenedor_titulo-span">
            <h3 class="subtitulo">Costo de producción</h3><span>$ 100</span>
        </div>

        <Tabla>
            {#snippet nombreColumnas()}
                <th>Nombre</th>
                <th>Grupo</th>
                <th class="icono">Origen</th>
                <th class="icono">Acciones</th>
            {/snippet}
            {#snippet datosFilas()}
                {#each INGREDIENTES_MOCK as ingrediente (ingrediente.id)}
                    <IngredienteRow {ingrediente} editarPlato={true} />
                {/each}
            {/snippet}
        </Tabla>
    </section>

    <div class="botones-juntos">
        <Boton data-testid="btnGuardar" type="submit" onclick={() => data.plato.validarPlato()}>Guardar cambios</Boton>
        <Boton data-testid="btnDescartar" tipo='secundario'>Descartar cambios</Boton>
    </div>
</main>