<script lang="ts">
  import './input.css'
  import type { PropsInput } from './propiedades'

  let { nombre_label, type, id, value = '', placeholder = '', required = true, ...rest }: PropsInput = $props()
</script>

<div class="label-input">
  <label for={id}>{nombre_label}</label>
  <input {type} {id} bind:value={value} {placeholder} {...rest} {required}>
</div>


  <!-- {#if textarea}
    <textarea class="textarea-descripcion"
    id={id} 
    {required}
    {...rest}
    > bind:value={value} <-- con esto se actualiza automaticamente con la variable padre (la info del back o de la vista menu)
    </textarea>
  {:else} -->