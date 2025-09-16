<script>
  import './switch.css'

  let {
    id='',
    titulo='',
    subtitulo=''
  } = $props()
</script>


<label class="switch switch-separacion" for="{id}">
    <span class="contenedor-texto">
        <span class="titulo-label"><b>{titulo}</b></span>
        <span class="subtitulo-label">{subtitulo}</span>
    </span>
    <input type="checkbox" id={id}>
    <span class="slider"></span>
</label>