<script>
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import ItemMenu from '$lib/components/menu/ItemMenu.svelte'
  import { platos } from '$lib/components/menu/platos'
</script>

<main class="menu-container main-vista">
  <header class="boton-titulo">
      <h1>Gestión del Menú</h1>
      <a href="./editar-plato">
        <Boton onclick={()=>{
          
        }}>Agregar nuevo plato</Boton>
      </a>
  </header>
  <section class="contenedor-general">
      <h2>Platos Disponibles</h2>
      <ul class="lista-menu">
        {#each platos as plato (plato.id)}
          <a href="./editar-plato/{plato.id}">
            <ItemMenu {plato} />
          </a>
        {/each}
      </ul>
  </section>
</main>

<style>
  @import './menu.css';
</style>