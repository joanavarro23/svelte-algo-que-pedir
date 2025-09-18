<script lang="ts">
  import './input.css'
  import type { PropsInput } from './propiedades'

  let { nombre_label, type, id, value = '', required = true, ...rest }: PropsInput = $props()
</script>

<div class="label-input">
  <label for={id}>{nombre_label}</label>
  <input {type} {id} bind:value={value} {...rest} {required}>
</div>