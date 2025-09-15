<script>
  import './input.css'

  let { for_label, descripcion, type, id, value, cantMax} = $props()
</script>
<div class="label-input">
    <label for={for_label}>{descripcion}</label>
    <input type={type} id={id} value={value} maxlength={cantMax} required>
</div>