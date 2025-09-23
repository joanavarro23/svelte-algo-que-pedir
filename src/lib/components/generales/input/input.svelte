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
    textarea = false,
    select = false,
    options = [] //array de opciones para el dropdown
  } = $props()
</script>

<div class="label-input">
  <label for={id}>{nombre}</label>

  {#if textarea}
    <textarea class="textarea-descripcion" {id} {required}>{value}</textarea>
  {:else if select}
    <select {id} bind:value {required}>
      {#each options as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else}
    <input {type} {id} bind:value {placeholder} {min} {maxlength} {required} />
  {/if}
</div>
