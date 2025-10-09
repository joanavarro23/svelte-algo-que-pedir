<script lang="ts">
  /* import moesBar from '$lib/assets/moes-bar.jpg' */
  //export let data
  import { Local } from '$lib/models/local.svelte.js'
  import { getLocal } from '$lib/services/localService'
  import { showToast } from '$lib/toasts/toasts'
  import Validador from '$lib/utils/validador.svelte'
  import PropsButton from '$lib/components/generales/boton/boton.svelte'
  import { PERFIL_LOCAL_MOCK } from '$lib/data/mocks/perfilLocalMock'
  import Checkbox from '$lib/components/generales/checkbox/checkbox.svelte'
  import ProfileCard from '$lib/components/perfil-local/profile-card.svelte'
  import { numMaximo, positivo, requerido } from '$lib/validaciones/validaciones'
  import type { MetodoDePago } from '$lib/models/metodosDePago.svelte'

  function validarPlato() {
    /* Agregar validaciones del plato antes de enviar el formulario*/
  }

  function guardarCambios() {
    /* Muesta los datos ingresados; después será la acción que va a enviar los datos del form al back*/

    showToast('La información del local fue guardada correctamente', 'success', 3000)
  }

  function descartarCambios() {
    showToast('Cambios descartados, no se realizaron modificaciones', 'warning', 3000)
  }

  let localData: any = null
  // Cargar la data al iniciar la página

  let local = new Local()

  const fetchLocal = async () => {
    const localData = await getLocal()
    console.log(localData)

    local.nombreLocal = localData?.nombre || ''
    local.urlImagen = localData?.urlImagenLocal || ''
    local.direccion = localData?.direccion || {}
    local.altura = localData?.altura || 0
    local.latitud = localData?.latitud || 0
    local.longitud = localData?.longitud || 0
    local.porcentajeApp = localData?.porcentajeSobreCadaPlato || 0
    local.porcentajeAutor = localData?.porcentajeRegaliasDeAutor || 0

    localData.mediosDePago.forEach((medio: string) => {
      if (medio === 'EFECTIVO') local.metodosDePago.Efectivo = true
      if (medio === 'TRANSFERENCIA_BANCARIA') local.metodosDePago.Transferencia = true
      if (medio === 'QR') local.metodosDePago.QR = true
    })

    //if (localData.mediosDePago) {
    //  localData.mediosDePago.forEach((medio: MetodoDePago) => {
    //    local.metodosDePago[medio] = true

    //    local.metodosDePago = { ...local.metodosDePago }
    //  })
    //}
  }

  fetchLocal()

  // Validaciones para el campo porcentaje, que no puede ser mayor a 100
  $: {
    if (!numMaximo(local.porcentajeApp, 100)) {
      alert('El porcentaje no puede ser mayor a 100')
      local.porcentajeApp = 100
    }
  }

  $: {
    if (!numMaximo(local.porcentajeAutor, 100)) {
      showToast('El porcentaje no puede ser mayor a 100', 'warning', 3000)
      local.porcentajeAutor = 100
    }
  }

  $: {
    if (!positivo(local.porcentajeApp)) {
      alert('El porcentaje no puede ser negativo')
      local.porcentajeApp = 0
    }
  }

  $: {
    if (!positivo(local.porcentajeAutor)) {
      alert('El porcentaje no puede ser negativo')
      local.porcentajeAutor = 0
    }
  }
</script>

<main class="contenedor-principal main-vista">
  <header class="titulo-principal">
    <h1>Información del local</h1>
  </header>

  <ProfileCard>
    <div class="informacion-local">
      <form class="inputs-local" on:submit>
        <label for="nombre-local">Nombre del local*</label>
        <input
          id="nombre-local"
          type="text"
          bind:value={local.nombreLocal}
          placeholder="Escribir"
          required
        />

        <label for="url-imagen-local">URL de la imagen*</label>
        <input
          id="url-imagen-local"
          type="text"
          bind:value={local.urlImagen}
          placeholder="Escribir"
          required
        />
      </form>

      <img src={local.urlImagen} alt="Imagen del local" class="imagen-local" />
      <!-- La imagen está siendo cargada directamente desde la URL declarada -->
    </div>
  </ProfileCard>

  <ProfileCard>
    <h3>Dirección</h3>
    <div class="card-inputs">
      <div>
        <label for="direccion">Dirección*</label>
        <input
          id="direccion"
          type="text"
          bind:value={local.direccion}
          placeholder="Escribir"
          required
        />
      </div>
      <div>
        <label for="altura">Altura*</label>
        <input
          id="altura"
          type="number"
          bind:value={local.altura}
          placeholder="Escribir"
          required
        />
      </div>
      <div>
        <label for="latitud">Latitud*</label>
        <input
          id="latitud"
          type="number"
          bind:value={local.latitud}
          placeholder="Escribir"
          required
        />
      </div>
      <div>
        <label for="longitud">Longitud*</label>
        <input
          id="longitud"
          type="number"
          bind:value={local.longitud}
          placeholder="Escribir"
          required
        />
      </div>
    </div>
  </ProfileCard>

  <ProfileCard>
    <h3>Porcentajes</h3>
    <div class="card-inputs">
      <div>
        <label for="porcentaje-comision-app">Porcentaje de comisión con la app*</label>
        <input
          id="porcentaje-comision-app"
          type="number"
          bind:value={local.porcentajeApp}
          placeholder="Escribir"
          required
        />
      </div>

      <div>
        <label for="porcentaje-comision-plato-autor">
          Porcentaje de comisión con autores de platos*
        </label>
        <input
          id="porcentaje-comision-plato-autor"
          type="number"
          bind:value={local.porcentajeAutor}
          placeholder="Escribir"
          required
        />
      </div>

      <h3>Métodos de pago</h3>
      <div class="metodos-de-pago">
        <Checkbox label="QR" bind:checked={local.metodosDePago.QR} />
        <Checkbox label="Efectivo" bind:checked={local.metodosDePago.Efectivo} />
        <Checkbox label="Transferencia" bind:checked={local.metodosDePago.Transferencia} />
      </div>
    </div>
  </ProfileCard>

  <div class="button">
    <PropsButton tipo="primario" onclick={guardarCambios}>Guardar Cambios</PropsButton>
    <PropsButton tipo="secundario" onclick={descartarCambios}>Descartar Cambios</PropsButton>
  </div>
</main>
