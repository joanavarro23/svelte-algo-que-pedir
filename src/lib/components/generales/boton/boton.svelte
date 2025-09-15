<script>
  import "$lib/components/generales/boton/boton.css"
  
  let { tipo = 'primario', nombre} = $props()
</script>

<button class="boton-{tipo}">{nombre}</button>