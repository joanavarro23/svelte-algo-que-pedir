<script>
  import './menu.css'
  import Boton from '$lib/components/generales/boton/boton.svelte'
</script>

<main class="menu-container main-vista">
  <header class="boton-titulo">
      <h1>Gestión del Menú</h1>
      <Boton 
      nombre= "Agregar nuevo plato"
      />
      <a href="/editar-plato">editar-plato</a>
  </header>
</main>