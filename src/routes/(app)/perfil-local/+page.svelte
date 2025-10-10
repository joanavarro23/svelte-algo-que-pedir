<script lang="ts">
  import { showToast } from '$lib/toasts/toasts'
  import type { LocalDTO } from '$lib/dto/localDTO'
  import { Local } from '$lib/models/local.svelte.js'
  import Validador from '$lib/utils/validador.svelte'
  import { getLocal } from '$lib/services/localService'
  import PropsButton from '$lib/components/generales/boton/boton.svelte'
  import Checkbox from '$lib/components/generales/checkbox/checkbox.svelte'
  import ProfileCard from '$lib/components/perfil-local/profile-card.svelte'

  function descartarCambios() {
    local.restaurar()
    showToast('Cambios descartados', 'warning', 3000)
  }

  const guardarCambios = async () => {
    await local.guardar()
  }

  let local = new Local()
  let localOriginal: Local = new Local()

  const fetchLocal = async () => {
    const localData: LocalDTO = await getLocal()

    local.nombreLocal = localData?.nombre || ''
    local.urlImagen = localData?.urlImagenLocal || ''
    local.direccion = localData?.direccion || ''
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

    localOriginal.nombreLocal = local.nombreLocal
    localOriginal.urlImagen = local.urlImagen
    localOriginal.direccion = local.direccion
    localOriginal.altura = local.altura
    localOriginal.latitud = local.latitud
    localOriginal.longitud = local.longitud
    localOriginal.porcentajeApp = local.porcentajeApp
    localOriginal.porcentajeAutor = local.porcentajeAutor
    localOriginal.metodosDePago = { ...local.metodosDePago }

    local.setOriginal()
  }

  fetchLocal()
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
        <Validador elemento={local} atributo="nombreLocal" />

        <label for="url-imagen-local">URL de la imagen*</label>
        <input
          id="url-imagen-local"
          type="text"
          bind:value={local.urlImagen}
          placeholder="Escribir"
          required
        />
        <Validador elemento={local} atributo="urlImagen" />
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
        <Validador elemento={local} atributo="direccion" />
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
        <Validador elemento={local} atributo="altura" />
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
        <Validador elemento={local} atributo="latitud" />
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
        <Validador elemento={local} atributo="longitud" />
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
        <Validador elemento={local} atributo="porcentajeApp" />
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
        <Validador elemento={local} atributo="porcentajeAutor" />
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
