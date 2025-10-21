<script lang="ts">
  import { showToast } from '$lib/utils/toasts/toasts'
  import { Local } from '$lib/models/local.svelte.js'
  import ValidadorMensaje from '$lib/utils/validadorMensaje/validadorMensaje.svelte'
  import PropsButton from '$lib/components/generales/boton/boton.svelte'
  import Checkbox from '$lib/components/generales/checkbox/checkbox.svelte'
  import ProfileCard from '$lib/components/perfil-local/profile-card.svelte'
  import { showError } from '$lib/utils/errorHandler.js'

  let { data } = $props()
  // console.log(data.localDataBackend.nombre)

  let local = new Local()

  local.nombreLocal = data.localDataBackend.nombre
  local.urlImagen = data.localDataBackend.urlImagenLocal
  local.direccion = data.localDataBackend.direccion
  local.altura = data.localDataBackend.altura
  local.latitud = data.localDataBackend.latitud
  local.longitud = data.localDataBackend.longitud
  local.porcentajeApp = data.localDataBackend.porcentajeSobreCadaPlato
  local.porcentajeAutor = data.localDataBackend.porcentajeRegaliasDeAutor

  data.localDataBackend.mediosDePago.forEach((medio: string) => {
    if (medio === 'QR') local.metodosDePago.QR = true
    if (medio === 'EFECTIVO') local.metodosDePago.Efectivo = true
    if (medio === 'TRANSFERENCIA_BANCARIA') local.metodosDePago.Transferencia = true
  })

  local.copiaOriginal()

  function descartarCambios() {
    showToast('Botón descartar tocado', 'info', 2000)
    console.log('Botón DESCARTAR tocado')
    if (local.hayCambios()) {
      local.restaurarValores()
      showToast('Cambios descartados', 'warning', 3000)
    } else {
      showToast('No hay cambios para descartar', 'warning', 3000)
    }
  }

  const guardarCambios = async () => {
    console.log('Botón GUARDAR tocado')
    await local.guardar()
    try {
      await local.guardar()
    } catch (err) {
      showError('Error al guardar los cambios del local', err)
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
          data-testid="nombre-local"
          type="text"
          bind:value={local.nombreLocal}
          placeholder="Escribir"
          required
        />
        <ValidadorMensaje elemento={local} atributo="nombreLocal" />

        <label for="url-imagen-local">URL de la imagen*</label>
        <input
          id="url-imagen-local"
          type="text"
          bind:value={local.urlImagen}
          placeholder="Escribir"
          required
        />
        <ValidadorMensaje elemento={local} atributo="urlImagen" />
      </form>

      <img src={local.urlImagen} alt="Imagen del local" class="imagen-local" />
      <!-- La imagen se carga directamente desde la URL declarada -->
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
        <ValidadorMensaje elemento={local} atributo="direccion" />
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
        <ValidadorMensaje elemento={local} atributo="altura" />
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
        <ValidadorMensaje elemento={local} atributo="latitud" />
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
        <ValidadorMensaje elemento={local} atributo="longitud" />
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
        <ValidadorMensaje elemento={local} atributo="porcentajeApp" />
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
        <ValidadorMensaje elemento={local} atributo="porcentajeAutor" />
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
    <PropsButton tipo="primario" onclick={guardarCambios} data-testid="guardar-cambios"
      >Guardar Cambios</PropsButton
    >
    <PropsButton tipo="secundario" onclick={descartarCambios} data-testid="descartar-cambios"
      >Descartar Cambios</PropsButton
    >
  </div>
</main>
