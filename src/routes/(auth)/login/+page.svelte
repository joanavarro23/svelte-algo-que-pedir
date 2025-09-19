<script>
  import './login.css'
  import logo from '$lib/assets/logo.svg'
  import InputOcultable from '$lib/components/login/inputOcultable.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'

  let usuario = $state('')
  let password = $state('')

  function enviarFormulario() {
    // Aquí puedes agregar la lógica para manejar el envío del formulario
  }
</script>

<main>
  <section class="contenedor-login">
    <div class="seccion-logo">
      <img class="imagen-logo" src={logo} alt="Logo Algo que Pedir" />
      <h1 class="app-name">Algo que pedir</h1>
    </div>
    <form class="contenedor-formulario" onsubmit={enviarFormulario}>
      <div class="grupo-formulario">
        <label for="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          class="input-formulario"
          placeholder="Escribir"
          required
          bind:value={usuario}
        />
      </div>
      <div class="grupo-formulario">
        <label for="password">Password</label>
        <InputOcultable id="password" name="password" required bind:value={password} />
      </div>
      <div>
        <Boton
          nombre="Iniciar Sesión"
          class="boton-primario boton-login"
          type="submit"
          onclick={enviarFormulario}
        />
      </div>
    </form>
    <p class="enlace-registro">¿No tienes una cuenta? <a href="registro">Regístrate</a></p>
  </section>
</main>
