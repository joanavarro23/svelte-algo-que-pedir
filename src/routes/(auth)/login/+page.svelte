<script>
  import logo from '$lib/assets/logo.svg'
  import InputOcultable from '$lib/components/login/inputOcultable.svelte'
  import Input from '$lib/components/generales/input/input.svelte'
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
        <Boton class="boton-primario boton-login" type="submit" onclick={enviarFormulario}
          >Iniciar Sesión</Boton
        >
      </div>
    </form>
    <p class="enlace-registro">¿No tienes una cuenta? <a href="registro">Regístrate</a></p>
  </section>
</main>
