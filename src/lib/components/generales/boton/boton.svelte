<script>
  import './boton.css'
  
  let { tipo = 'primario', nombre} = $props()
</script>

<button class="boton-{tipo}">{nombre}</button>