<script>
  import moesBar from '$lib/assets/moes-bar.jpg'
  import PropsButton from '$lib/components/generales/boton/boton.svelte'
  import Checkbox from '$lib/components/generales/checkbox/checkbox.svelte'
  import ProfileCard from '$lib/components/perfil-local/profile-card.svelte'
  
  function guardarCambios() {
    /* Muesta los datos ingresados; después es la acción que va a enviar los datos del form al back*/
    const datosLocal = {
      nombreLocal,
      urlImagen,
      direccion,
      altura,
      latitud,
      longitud,
      porcentajeApp,
      porcentajeAutor,
      metodosDePago: {
        QR: metodos.qr,
        Efectivo: metodos.efectivo,
        Transferencia: metodos.transferencia
      }
    }

    alert(
      'Datos ingresados:\n' +
      `Nombre Local: ${datosLocal.nombreLocal}\n` +
      `URL Imagen: ${datosLocal.urlImagen}\n` +
      `Dirección: ${datosLocal.direccion}\n` +
      `Altura: ${datosLocal.altura}\n` +
      `Latitud: ${datosLocal.latitud}\n` +
      `Longitud: ${datosLocal.longitud}\n` +
      `Porc. App: ${datosLocal.porcentajeApp}\n` +
      `Porc. Autor: ${datosLocal.porcentajeAutor}\n` +
      'Métodos de pago:\n' +
      `  QR: ${datosLocal.metodosDePago.QR ? '✅' : '❌'}\n` +
      `  Efectivo: ${datosLocal.metodosDePago.Efectivo ? '✅' : '❌'}\n` +
      `  Transferencia: ${datosLocal.metodosDePago.Transferencia ? '✅' : '❌'}`
    )
  }

  function descartarCambios() {
    alert('Cambios descartados :(')
  }
  
  let nombreLocal = ''
  let urlImagen = ''
  let direccion = ''
  let altura = ''
  let latitud = ''
  let longitud = ''
  let porcentajeApp = ''
  let porcentajeAutor = ''
  let metodos = {
    efectivo: false,
    qr: false,
    transferencia: false
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
          <input id="nombre-local" type="text" bind:value={nombreLocal} placeholder="Escribir" required />

          <label for="url-imagen-local">URL de la imagen*</label>
          <input id="url-imagen-local" type="text" bind:value={urlImagen} placeholder="Escribir" required />
        </form>

        <img src={moesBar} alt="Imagen del local" class="imagen-local" />
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
  <div>
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
          <label for="porcentaje-comision-plato-autor">Porcentaje de comisión con autores de platos*</label>
          <input
            id="porcentaje-comision-plato-autor"
            type="number"
            bind:value={porcentajeAutor}
            placeholder="Escribir"
            required
          />
        </div>
      </div>

      <h3>Métodos de pago</h3>
      <div class="metodos-de-pago">
        <Checkbox label="QR" bind:checked={metodos.qr} />
        <Checkbox label="Efectivo" bind:checked={metodos.efectivo} />
        <Checkbox label="Transferencia" bind:checked={metodos.transferencia} />
      </div>
    </div>
</ProfileCard>

  <div class="button">
    <PropsButton tipo="primario" onclick={guardarCambios}>
        Guardar Cambios
    </PropsButton>

    <PropsButton tipo="secundario" onclick={descartarCambios}>
        Descartar Cambios
    </PropsButton>
  </div>
  
</main>
