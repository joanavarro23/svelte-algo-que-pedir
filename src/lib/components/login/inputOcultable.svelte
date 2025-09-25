<script lang="ts">
  import './inputOcultable.css'
  import Input from '$lib/components/generales/input/input.svelte'
  interface Props {
    id: string
    nombre_label: string
    nombre: string
    placeholder?: string
    required?: boolean
    value: string
  }

  let {
    id,
    nombre_label = '',
    nombre: name,
    placeholder = 'Escribir',
    required = true,
    value = $bindable()
  }: Props = $props()

  let passOculta = $state(false)

  function togglePassword() {
    passOculta = !passOculta
  }
</script>

<div class="contenedor-password">
  <Input
    {nombre_label}
    type={passOculta ? 'text' : 'password'}
    {id}
    {name}
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
</style>
