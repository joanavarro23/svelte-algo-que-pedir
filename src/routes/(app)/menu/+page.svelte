<script lang='ts'>
  import { goto } from '$app/navigation'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import ItemMenu from '$lib/components/menu/ItemMenu.svelte'
  import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'

  const navegarANuevoPlato = () => {
    goto('./editar-plato/nuevo')
  }
</script>

<main class="menu-container main-vista">
  <header class="boton-titulo">
      <h1>Gestión del Menú</h1>
        <Boton onclick={
          navegarANuevoPlato
        }>Agregar nuevo plato</Boton>
  </header>
  <section class="contenedor-general">
      <h2>Platos Disponibles</h2>
      <ul class="lista-menu">
        {#each PLATOS_MOCK as plato (plato.id)}
          <a href="./editar-plato/{plato.id}">
            <ItemMenu {plato} />
          </a>
        {/each}
      </ul>
  </section>
</main>

<style>
  @import './menu.css';

  h2 {
    padding-bottom: 1rem;
  }
</style>