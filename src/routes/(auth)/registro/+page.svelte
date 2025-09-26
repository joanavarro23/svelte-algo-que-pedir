<script>
  import logo from '$lib/assets/logo.svg'
  import InputOcultable from '$lib/components/login/inputOcultable.svelte'
  import Input from '$lib/components/generales/input/input.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'

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
        <Boton class="boton-primario boton-login" type="submit" onclick={enviarFormulario}
          >Crear Cuenta</Boton
        >
      </div>
    </form>
    <p class="enlace-registro">¿Ya tienes una cuenta? <a href="login">Inicia sesión</a></p>
  </section>
</main>
