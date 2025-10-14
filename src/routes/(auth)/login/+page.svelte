<script lang="ts">
  import logo from '$lib/assets/logo.svg'
  import InputOcultable from '$lib/components/login/inputOcultable.svelte'
  import Input from '$lib/components/generales/input/input.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'

  let usuario = $state('')
  let password = $state('')
  let mensajeError = $state('')
  let cargando = $state(false)

  async function enviarFormulario() {
    cargando = true
    mensajeError = ''

    try {
      const response = await fetch('http://localhost:9000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      })
      const data = await response.json()

      if (response.ok && data.success) {
        // Login exitoso
        sessionStorage.setItem('usuario', data.usuario)
        window.location.assign('/')
      } else {
        // Error en el login
        mensajeError = data.message || 'Usuario o contraseña incorrecto. Vuelva a intentarlo.'
        password = ''
      }
    } catch {
      mensajeError = 'Error de conexión. Por favor, inténtelo de nuevo más tarde.'
      password = ''
    } finally {
      cargando = false
    }
  }
</script>

<main>
  <section class="contenedor-login">
    <div class="seccion-logo">
      <img class="imagen-logo" src={logo} alt="Logo Algo que Pedir" />
      <h1 class="app-name">Algo que pedir</h1>
    </div>
    <form
      class="contenedor-formulario"
      onsubmit={(event) => {
        event.preventDefault()
        enviarFormulario()
      }}
    >
      <div class="grupo-formulario">
        {#if mensajeError}
          <p class="mensaje-error">{mensajeError}</p>
        {/if}
        <Input
          nombre_label="Usuario"
          type="text"
          id="usuario"
          name="usuario"
          placeholder="Escribir"
          required
          bind:value={usuario}
          disabled={cargando}
        />
      </div>
      <div class="grupo-formulario">
        <InputOcultable
          nombre_label="Password"
          id="password"
          nombre="password"
          required
          bind:value={password}
          disabled={cargando}
        />
      </div>
      <div>
        <Boton class="boton-primario boton-login" type="submit" disabled={cargando}
          >{cargando ? 'Iniciando...' : 'Iniciar Sesión'}</Boton
        >
      </div>
    </form>
    <p class="enlace-registro">¿No tienes una cuenta? <a href="registro">Regístrate</a></p>
  </section>
</main>
