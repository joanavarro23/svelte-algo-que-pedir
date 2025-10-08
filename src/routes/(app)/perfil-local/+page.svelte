<script lang="ts">
  /* import moesBar from '$lib/assets/moes-bar.jpg' */
  export let data
  import { getLocal } from '$lib/services/localService'
  import { showToast } from '$lib/toasts/toasts'
  import Validador from '$lib/utils/validador.svelte'
  import PropsButton from '$lib/components/generales/boton/boton.svelte'
  import { PERFIL_LOCAL_MOCK } from '$lib/data/mocks/perfilLocalMock'
  import Checkbox from '$lib/components/generales/checkbox/checkbox.svelte'
  import ProfileCard from '$lib/components/perfil-local/profile-card.svelte'
  import { numMaximo, positivo, requerido } from '$lib/validaciones/validaciones'

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

  let nombreLocal = ''
  let urlImagen = ''
  let direccion = ''
  let altura = 0
  let latitud = 0
  let longitud = 0
  let porcentajeApp = 0
  let porcentajeAutor = 0
  let metodosDePago: Record<string, boolean> = { QR: false, Efectivo: false, Transferencia: false }

  const fetchLocal = async () => {
    const localData = await getLocal()

    nombreLocal = localData?.nombre || ''
    urlImagen = localData?.urlImagen || ''
    direccion = localData?.direccion.calle || {}
    altura = localData?.direccion?.altura || 0
    latitud = localData?.direccion?.ubicacion?.x || 0
    longitud = localData?.direccion?.ubicacion?.y || 0
    porcentajeApp = localData?.porcentajeSobreCadaPlato || 0
    porcentajeAutor = localData?.porcentajeRegaliasDeAutor || 0
    metodosDePago = localData?.mediosDePago || []
  }

  fetchLocal()

  // Validaciones para el campo porcentaje, que no puede ser mayor a 100
  $: {
    if (!numMaximo(porcentajeApp, 100)) {
      alert('El porcentaje no puede ser mayor a 100')
      porcentajeApp = 100
    }
  }

  $: {
    if (!numMaximo(porcentajeAutor, 100)) {
      showToast('El porcentaje no puede ser mayor a 100', 'warning', 3000)
      porcentajeAutor = 100
    }
  }

  $: {
    if (!positivo(porcentajeApp)) {
      alert('El porcentaje no puede ser negativo')
      porcentajeApp = 0
    }
  }

  $: {
    if (!positivo(porcentajeAutor)) {
      alert('El porcentaje no puede ser negativo')
      porcentajeAutor = 0
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
          bind:value={nombreLocal}
          placeholder="Escribir"
          required
        />

        <label for="url-imagen-local">URL de la imagen*</label>
        <input
          id="url-imagen-local"
          type="text"
          bind:value={urlImagen}
          placeholder="Escribir"
          required
        />
      </form>

      <img src={urlImagen} alt="Imagen del local" class="imagen-local" />
      <!-- La imagen está siendo cargada directamente desde la URL declarada -->
    </div>
  </ProfileCard>

  <ProfileCard>
    <h3>Dirección</h3>
    <div class="card-inputs">
      <div>
        <label for="direccion">Dirección*</label>
        <input id="direccion" type="text" bind:value={direccion} placeholder="Escribir" required />
      </div>
      <div>
        <label for="altura">Altura*</label>
        <input id="altura" type="number" bind:value={altura} placeholder="Escribir" required />
      </div>
      <div>
        <label for="latitud">Latitud*</label>
        <input id="latitud" type="number" bind:value={latitud} placeholder="Escribir" required />
      </div>
      <div>
        <label for="longitud">Longitud*</label>
        <input id="longitud" type="number" bind:value={longitud} placeholder="Escribir" required />
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
          bind:value={porcentajeApp}
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
          bind:value={porcentajeAutor}
          placeholder="Escribir"
          required
        />
      </div>

      <h3>Métodos de pago</h3>
      <div class="metodos-de-pago">
        <Checkbox label="QR" bind:checked={metodosDePago.QR} />
        <Checkbox label="Efectivo" bind:checked={metodosDePago.Efectivo} />
        <Checkbox label="Transferencia" bind:checked={metodosDePago.Transferencia} />
      </div>
    </div>
  </ProfileCard>

  <div class="button">
    <PropsButton tipo="primario" onclick={guardarCambios}>Guardar Cambios</PropsButton>
    <PropsButton tipo="secundario" onclick={descartarCambios}>Descartar Cambios</PropsButton>
  </div>
</main>
