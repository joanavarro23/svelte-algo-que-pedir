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
    value?: string,
    textarea?: boolean
    select?: boolean,
    options: {value: string, label: string}[] //array de opciones para el dropdown
  }
  
  let { nombre_label, type, id, value=$bindable(''), required=true, textarea=false, select=false, options=[], ...rest }: PropsInput = $props()
</script>

<div class="label-input">
  <label for={id}>{nombre_label}</label>
  {#if textarea}
    <textarea class="textarea-descripcion" id={id} bind:value={value} {required}></textarea>
  {:else if select}
    <select {id} bind:value {required}>
      {#each options as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else}
    <input {type} {id} bind:value={value} {...rest} {required}>
  {/if}
</div>