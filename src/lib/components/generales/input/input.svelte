<script lang="ts">
  import './input.css'
  import type { HTMLInputAttributes } from 'svelte/elements'

  // el tipo '' es para el textarea que se trabaja sin type, pero
  //   para mayor control lo pongo en este componente
  export type InputType = '' | 'checkbox' | 'email' | 'file' | 'number' | 'password' | 'text'

  interface PropsInput extends HTMLInputAttributes {
    nombre_label: string,
    type: InputType,
    id: string,
    value?: string
  }
  
  let { nombre_label, type, id, value=$bindable(''), required=true, ...rest }: PropsInput = $props()
</script>

<div class="label-input">
  <label for={id}>{nombre_label}</label>
  <input {type} {id} bind:value={value} {...rest} {required}>
</div>