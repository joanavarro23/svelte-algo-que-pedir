<script lang="ts">
  /* import moesBar from '$lib/assets/moes-bar.jpg' */
  //export let data

  import { showToast } from '$lib/toasts/toasts'
  import type { LocalDTO } from '$lib/dto/localDTO'
  import { Local } from '$lib/models/local.svelte.js'
  import Validador from '$lib/utils/validador.svelte'
  import { getLocal } from '$lib/services/localService'
  import { updateLocal } from '$lib/services/localService'
  //import { PERFIL_LOCAL_MOCK } from '$lib/data/mocks/perfilLocalMock'
  import type { MetodoDePago } from '$lib/models/metodosDePago.svelte'
  import PropsButton from '$lib/components/generales/boton/boton.svelte'
  import Checkbox from '$lib/components/generales/checkbox/checkbox.svelte'
  import ProfileCard from '$lib/components/perfil-local/profile-card.svelte'
  import { numMaximo, positivo, requerido } from '$lib/validaciones/validaciones'

  function validarPlato() {
    /* Agregar validaciones del plato antes de enviar el formulario*/
    return true
  }

  function descartarCambios() {
    showToast('Se descartaron los cambios, no se realizaron modificaciones', 'warning')
  }

  function guardarCambiosBackup() {
    /* Muesta los datos ingresados; después será la acción que va a enviar los datos del form al back*/
    if (validarPlato()) {
      showToast('La información del local fue guardada correctamente', 'success', 3000)
    } else {
      showToast('Error!', 'error', 3000)
    }
  }

  async function guardarCambios() {
    const mediosParaBackend: MetodoDePago[] = []

    if (local.metodosDePago.QR) mediosParaBackend.push('QR' as MetodoDePago)
    if (local.metodosDePago.Efectivo) mediosParaBackend.push('EFECTIVO' as MetodoDePago)
    if (local.metodosDePago.Transferencia)
      mediosParaBackend.push('TRANSFERENCIA_BANCARIA' as MetodoDePago)

    const localDTO: LocalDTO = {
      nombre: local.nombreLocal,
      urlImagenLocal: local.urlImagen,
      direccion: local.direccion,
      altura: local.altura,
      latitud: local.latitud,
      longitud: local.longitud,
      porcentajeSobreCadaPlato: local.porcentajeApp,
      porcentajeRegaliasDeAutor: local.porcentajeAutor,
      mediosDePago: mediosParaBackend
    }

    try {
      await updateLocal(localDTO)
      showToast('La información del local fue guardada correctamente', 'success', 3000)
    } catch (error) {
      showToast('Error al guardar la información del local: ' + error, 'error', 10000)
      console.error(error)
    }
  }

  let localData: any = null
  // Cargar la data al iniciar la página

  let local = new Local()

  const fetchLocal = async () => {
    const localData = await getLocal()
    //console.log(localData)

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

    // Agregar enlace de Google Maps
  }

  fetchLocal()
</script>

<main class="contenedor-principal main-vista">
  <header class="titulo-principal">
    <h1>Información del local: {local.nombreLocal}</h1>
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
