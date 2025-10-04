<script lang='ts'>
  import './editar-plato.css'
  import { goto } from '$app/navigation'
  import type { Plato } from '$lib/models/plato.svelte'

  // Componentes
  import Input from '$lib/components/generales/input/input.svelte'
  import Textarea from '$lib/components/generales/input/textarea.svelte'
  import Switch from '$lib/components/generales/switch/switch.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
  import Validador from '$lib/utils/validador.svelte'
  import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'

  // Recibo la carga del plato segun corresponda
  const { data } = $props< {plato: Plato[], esNuevo: boolean}>()
  let { plato } = data.plato

  // Dinamismo para el titulo y el texto del boton primario
  const titulo = $derived(
    data.esNuevo ? 'Agregar nuevo plato' : `Editar Plato: ${plato?.nombre ?? ''}`
  )
  const txtBtnPrimario = $derived( data.esNuevo ? 'Agregar plato' : 'Guardar cambios' )

  // Funciones para los botones
  const guardar = () => { plato.guardar()}
  const descartar = () => { goto ('/menu') }
</script>

<main class="main-vista vista-editar-plato">
    <h1 class="titulo">{titulo}</h1>

    <!-- Descripción del plato -->
    <section class="contenedor-general editar-plato">
        <form>
            <Input data-testid="titulo" nombre_label="Nombre del plato*" type="text" id="nombre"
            bind:value={plato.nombre} maxlength={30} placeholder="Ej: Hamburguesa completa con cheddar"/>
            <Validador elemento={plato} atributo="titulo"/>

            <Textarea data-testid="descripcion" id="descripcion" nombre_label="Descripcion*" textarea={true}
            bind:value={plato.descripcion}/>
            <Validador elemento={plato} atributo="descripcion"/>

            <!-- <Input data-testid="imagen" nombre_label="URL de la imagen del plato*" type="file" id="imagen"
            accept="image/jpeg,image/jpg,image/png" bind:value={data.plato.imagen}/> -->
            <Input data-testid="imagen" nombre_label="URL de la imagen del plato*" type="text" id="imagen"
            bind:value={plato.imagen}/>
            <Validador elemento={plato} atributo="imagen"/>
        </form>

        <!-- Imagen de referencia -->
        <div class="editar-plato__imagen">
            <img class="foto" src={plato.imagen} alt="Vista previa del plato">
        </div>
    </section>

    <!-- Costos del plato -->
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Costos</h2>
        <form class="costos-plato">
            <Input data-testid="precio" nombre_label="Precio Base*" type="number" id="precio" 
            bind:value={plato.precio} placeholder="Ej: 500" min=0 />
            <Validador elemento={plato} atributo="precio"/>

            <Switch id="platoDeAutor" titulo="Plato de Autor" subtitulo="Aplica un porcentaje adicional al precio de venta" 
            bind:checked={plato.platoDeAutor}/>
            <Switch id="platoDePromocion" titulo="Plato en Promoción" subtitulo="Aplica un descuento al precio de venta" 
            bind:checked={plato.platoDePromocion}/>
        </form>
    </section>

    <!-- Detalle de los ingredientes  -->
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Ingredientes</h2>
        <div class="contenedor_titulo-span">
            <h3 class="subtitulo">Costo de producción</h3><span>{plato.precio}</span>
        </div>

        <Tabla>
            {#snippet nombreColumnas()}
                <th>Nombre</th>
                <th>Grupo</th>
                <th class="icono">Origen</th>
                <th class="icono">Acciones</th>
            {/snippet}
            {#snippet datosFilas()}
                {#if plato.ingredientes?.length}
                    {#each data.plato.ingredientes as ingrediente (ingrediente.id)}
                        <IngredienteRow {ingrediente} editarPlato={true} />
                    {/each}
                {:else}
                    <tr>
                        <td colspan="4">No hay ingredientes</td>
                    </tr>
                {/if}
            {/snippet}
        </Tabla>
    </section>

    <div class="botones-juntos">
        <Boton data-testid="btnGuardar" type="submit" onclick={() => guardar()}>{txtBtnPrimario}</Boton>
        <Boton data-testid="btnDescartar" tipo='secundario' onclick={() => descartar()}>Descartar cambios</Boton>
    </div>
</main>