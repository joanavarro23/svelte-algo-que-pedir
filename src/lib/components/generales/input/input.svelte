<script lang="ts">
  import './input.css'
  import type { HTMLInputAttributes } from 'svelte/elements'

  // el tipo '' es para el textarea que se trabaja sin type, pero
  //   lo quiero controlar desde este componente para mayor control de todos los inputs distintos.  
  export type InputType = '' | 'checkbox' | 'email' | 'file' | 'number' | 'password' | 'text'

  interface PropsInput extends HTMLInputAttributes {
    nombre_label: string,
    type: InputType,
    id: string,
    value?: string,
    textarea?: boolean
  }
  
  let { nombre_label, type, id, value = $bindable(''), required = true, textarea = false, ...rest }: PropsInput = $props()
</script>

{#if !textarea}
  <div class="label-input">
    <label for={id}>{nombre_label}</label>
    <input {type} {id} bind:value={value} {...rest} {required}>
  </div>
{:else}
  <div class="label-input">
    <label for={id}>{nombre_label}</label>
    <textarea class="textarea-descripcion" id={id} bind:value={value} {required}></textarea>
  </div>
{/if}