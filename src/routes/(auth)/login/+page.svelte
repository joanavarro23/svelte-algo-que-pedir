<script lang="ts">
  import users from '../users.txt?raw'
  import { hash53 } from '$lib/utils/hash53'
  import logo from '$lib/assets/logo.svg'
  import InputOcultable from '$lib/components/login/inputOcultable.svelte'
  import Input from '$lib/components/generales/input/input.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'

  let usuario = $state('')
  let password = $state('')
  let intentoFallido = $state(false)

  function hashPassword(password: string): string {
    return hash53(password).toString(16)
  }
  function enviarFormulario() {
    const usuariosLocales: Record<string, string> = {}

    const archivoUsuarios = users.split('\n')
    archivoUsuarios.forEach((linea) => {
      const [fileUser, filePass] = linea.trim().split(',')
      if (fileUser && filePass) {
        usuariosLocales[fileUser] = filePass
      }
    })

    const hashedPassword = hashPassword(password)

    if (usuariosLocales[usuario] && usuariosLocales[usuario] === hashedPassword) {
      window.location.assign('/') // Redirigir a la pedidos actuales
    } else {
      password = '' // Limpiar el campo de contraseña
      intentoFallido = true
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
        {#if intentoFallido}
          <figure class="mensaje-error">
            Usuario o contraseña incorrectos. Intente nuevamente.
          </figure>
        {/if}
        <Input
          nombre_label="Usuario"
          type="text"
          id="usuario"
          name="usuario"
          placeholder="Escribir"
          required
          bind:value={usuario}
        />
      </div>
      <div class="grupo-formulario">
        <InputOcultable
          nombre_label="Password"
          id="password"
          nombre="password"
          required
          bind:value={password}
        />
      </div>
      <div>
        <Boton class="boton-primario boton-login" type="submit">Iniciar Sesión</Boton>
      </div>
    </form>
    <p class="enlace-registro">¿No tienes una cuenta? <a href="registro">Regístrate</a></p>
  </section>
</main>
