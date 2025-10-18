<script lang='ts'>
  import './editar-plato.css'
  import { goto } from '$app/navigation'
  import type { Plato } from '$lib/models/plato.svelte'
  import { platosService } from '$lib/services/platoService'
  import plus from '$lib/assets/plus-circle.svg'

  // Componentes
  import Input from '$lib/components/generales/input/input.svelte'
  import Textarea from '$lib/components/generales/input/textarea.svelte'
  import Switch from '$lib/components/generales/switch/switch.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
  import ValidadorMensaje from '$lib/utils/validadorMensaje/validadorMensaje.svelte'
  import IngredienteRow from '$lib/components/ingredientes/IngredienteRow.svelte'
  import IconoBoton from '$lib/components/generales/icono boton/iconoBoton.svelte'
  import { showToast } from '$lib/utils/toasts/toasts'
  import { showError } from '$lib/utils/errorHandler'

  
  // Recibo la carga del plato segun corresponda
  let { data } = $props()
  const { plato, nuevoPlato } = data

  // Dinamismo para el titulo y el texto del boton primario
  const titulo = $derived(
    nuevoPlato ? 'Agregar nuevo plato' : `Editar Plato: ${plato?.nombre ?? ''}`
  )
  const txtBtnPrimario = $derived( nuevoPlato ? 'Agregar plato' : 'Guardar cambios' )

  // Funciones para los botones
  const volver = () => { goto ('/menu') }
  const guardar = async () => { 
    try {
      const platoActual: Plato = plato
      platoActual.validarPlato()
      if (!platoActual.invalid()) {
        if (nuevoPlato) {
          await platosService.crearPlato(platoActual)
          showToast('Plato creado con éxito', 'success')
        } else {
          await platosService.actualizarPlato(platoActual)
          showToast('Ingrediente actualizado con éxito', 'success')
        }
        volver()
      }
    } catch (error) {
      showError('Error al guardar el plato', error)
    }
  }
</script>

<main class="main-vista vista-editar-plato">
    <h1 class="titulo">{titulo}</h1>

    <!-- Descripción del plato -->
    <section class="contenedor-general editar-plato">
        <form>
            <Input data-testid="titulo" nombre_label="Nombre del plato*" type="text" id="nombre"
            bind:value={plato.nombre} maxlength={30} placeholder="Ej: Hamburguesa completa con cheddar"/>
            <ValidadorMensaje elemento={plato} atributo="titulo"/>

            <Textarea data-testid="descripcion" id="descripcion" nombre_label="Descripcion*" textarea={true}
            bind:value={plato.descripcion}/>
            <ValidadorMensaje elemento={plato} atributo="descripcion"/>

            <!-- <Input data-testid="imagen" nombre_label="URL de la imagen del plato*" type="file" id="imagen"
            accept="image/jpeg,image/jpg,image/png" bind:value={data.plato.imagen}/> -->
            <Input data-testid="imagen" nombre_label="URL de la imagen del plato*" type="text" id="imagen"
            bind:value={plato.imagen}/>
            <ValidadorMensaje elemento={plato} atributo="imagen"/>
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
            <Input data-testid="valorBase" nombre_label="Precio Base*" type="number" id="valorBase" 
            bind:value={plato.valorBase} placeholder="Ej: 500" min=0 />
            <ValidadorMensaje elemento={plato} atributo="valorBase"/>

            <Switch id="esDeAutor" titulo="Plato de Autor" subtitulo="Aplica un porcentaje adicional al precio de venta" 
            bind:checked={plato.esDeAutor}/>
            <Switch id="estaEnPromocion" titulo="Plato en Promoción" subtitulo="Aplica un descuento al precio de venta" 
            bind:checked={plato.estaEnPromocion}/>
        </form>
    </section>

    <!-- Detalle de los ingredientes  -->
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Ingredientes</h2>
        <div class="contenedor_titulo-span">
            <h3 class="subtitulo">Costo de producción</h3><span>{plato.valorBase}</span>
        </div>

        <Tabla>
            {#snippet nombreColumnas()}
                <th>Nombre</th>
                <th>Grupo</th>
                <th class="txtColumna">Origen</th>
                <th class="txtColumna">Acciones</th>
            {/snippet}
            {#snippet datosFilas()}
                    {#each data.plato.ingredientes as ingrediente (ingrediente.id)}
                        <IngredienteRow {ingrediente} />
                    {/each}
            {/snippet}
            {#snippet  datosExtra()}
                <td colspan="3">Seleccionar ingrediente...</td>
                <td class="icono-accion">
                    <IconoBoton >
                    <!-- onclick={ ACA IRIA EL MODAL QUE MUESTRA LA LISTA DE INGREDIENTES DISPONIBLES } -->
                        <img src={plus} alt="agregar" />
                    </IconoBoton>
                </td>               
            {/snippet}
        </Tabla>
    </section>

    <div class="botones-juntos">
        <Boton data-testid="btnGuardar" type="submit" onclick={guardar}>{txtBtnPrimario}</Boton>
        <Boton data-testid="btnDescartar" tipo='secundario' onclick={volver}>Descartar cambios</Boton>
    </div>
</main>