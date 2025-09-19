<script>
  import './login.css'
  import logo from '$lib/assets/logo.svg'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import InputOcultable from '$lib/components/login/inputOcultable.svelte'

  let usuario = $state('')
  let password = $state('')
  let confirmarPassword = $state('')

  function enviarFormulario() {
    // lógica de registro
  }
</script>

<main>
  <section class="contenedor-login">
    <div class="seccion-logo">
      <img class="imagen-logo" src={logo} alt="Logo Algo que Pedir" />
      <h1>Crea tu cuenta</h1>
    </div>
    <form class="contenedor-formulario">
      <div class="grupo-formulario">
        <label for="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          class="input-formulario"
          name="usuario"
          placeholder="Escribir"
          required
          bind:value={usuario}
        />
      </div>
      <div class="grupo-formulario">
        <label for="password">Password</label>
        <InputOcultable id="password" name="password" required bind:value={password} />
      </div>
      <div class="grupo-formulario">
        <label for="confirmar">Re-ingrese el Password</label>
        <InputOcultable id="confirmar" name="confirm" required bind:value={confirmarPassword} />
      </div>
      <div>
        <Boton
          nombre="Registrarse"
          class="boton-primario boton-login"
          type="submit"
          onclick={enviarFormulario}
        />
      </div>
    </form>
    <p class="enlace-registro">¿Ya tienes una cuenta? <a href="login">Inicia sesión</a></p>
  </section>
</main>
