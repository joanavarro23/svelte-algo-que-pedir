<script lang="ts">
  import { goto } from '$app/navigation'
  import users from '../users.txt?raw'
  import { hash53 } from '$lib/utils/hash53'
  import logo from '$lib/assets/logo.svg'
  import InputOcultable from '$lib/components/login/inputOcultable.svelte'
  import Input from '$lib/components/generales/input/input.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'

  let usuario = $state('')
  let password = $state('')
  let confirmarPassword = $state('')
  let mensajeError = $state('')

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

    if (password !== confirmarPassword) {
      password = ''
      confirmarPassword = ''
      mensajeError = 'Las contraseñas no coinciden'
      return
    } else if (usuariosLocales[usuario]) {
      password = ''
      confirmarPassword = ''
      mensajeError = 'El usuario ya existe'
      return
    } else {
      //Simular agregar usuario al archivo users.txt porque el backend no está implementado
      //No se puede escribir en un archivo desde el frontend por razones de seguridad
      const hashedPassword = hashPassword(password)
      const nuevaLinea = `${usuario},${hashedPassword}\n`
      /* eslint-disable no-console */
      console.log('Nueva linea a agregar:', nuevaLinea)
      goto('/login') // Redirigir a la pagina de login
    }
  }
</script>

<main>
  <section class="contenedor-login">
    <div class="seccion-logo">
      <img class="imagen-logo" src={logo} alt="Logo Algo que Pedir" />
      <h1>Crea tu cuenta</h1>
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
      <div class="grupo-formulario">
        <InputOcultable
          nombre_label="Re-ingrese el Password"
          id="confirmar"
          nombre="confirmar"
          required
          bind:value={confirmarPassword}
        />
      </div>
      <div>
        <Boton class="boton-primario boton-login" type="submit">Crear Cuenta</Boton>
      </div>
    </form>
    <p class="enlace-registro">¿Ya tienes una cuenta? <a href="login">Inicia sesión</a></p>
  </section>
</main>
