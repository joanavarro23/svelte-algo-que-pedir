<script>
  import './input.css'

  let {
    nombre = '',
    type = '',
    id = '',
    value = '',
    placeholder = '',
    maxlength = null,
    min = 0,
    required = false,
    textarea = false
  } = $props()
</script>

<div class="label-input">
  <label for={id}>{nombre}</label>

  {#if textarea}
    <textarea class="textarea-descripcion" {id} {required}>{value}</textarea>
  {:else}
    <input {type} {id} bind:value {placeholder} {min} {maxlength} {required} />
  {/if}
</div>
