<script lang="ts">
  interface Props {
    id: string
    name: string
    placeholder?: string
    required?: boolean
    value: string
  }

  let { id, name, placeholder = 'Escribir', required = true, value = $bindable() }: Props = $props()

  let passOculta = $state(false)

  function togglePassword() {
    passOculta = !passOculta
  }
</script>

<div class="contenedor-password">
  <input
    type={passOculta ? 'text' : 'password'}
    {id}
    {name}
    class="input-formulario"
    {placeholder}
    {required}
    bind:value
  />
  <button
    type="button"
    class="base-toggle-password toggle-button"
    onclick={togglePassword}
    aria-label={passOculta ? 'Ocultar contraseña' : 'Mostrar contraseña'}
  >
    <div class="icono-ojo {passOculta ? 'mostrar' : ''}"></div>
  </button>
</div>

<style>
  .contenedor-password {
    position: relative;
    margin: auto;
  }

  .base-toggle-password {
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    margin: 0;
  }

  .icono-ojo {
    width: 30px;
    height: 30px;
    background-image: url('$lib/assets/eye.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: background-image 0.3s ease;
  }

  .icono-ojo.mostrar {
    background-image: url('$lib/assets/eye-slash.svg');
  }

  .toggle-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .toggle-button:hover {
    box-shadow: none;
  }
</style>
