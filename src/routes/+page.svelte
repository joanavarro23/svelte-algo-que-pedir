<script lang="ts">
  import './pedidos-actuales.css'
  import Header from '$lib/components/layout/header/Header.svelte'
  import PedidoCard from '$lib/components/pedidos/pedido-card.svelte'
  import { PEDIDOS_MOCK } from '$lib/data/mocks/pedidosMock'

</script>
<Header />
<main class="container-principal main-vista">
  <!-- Contenedor de toda la vista -->
  <h1>Pedidos actuales</h1>

  <nav class="container-estados">
    <!-- Contenedor de los estados de los pedidos -->
    <a href="#" class="link-estados">Pendientes</a>
    <a href="#" class="link-estados">Preparados</a>
    <a href="#" class="link-estados">Entregados</a>
    <a href="#" class="link-estados">Cancelados</a>
  </nav>

  <section class="container-tarjetas">
    <!-- Contenedor de las tarjetas de pedidos -->
    {#each PEDIDOS_MOCK as pedido (pedido.id)}
      <PedidoCard {pedido} />
    {/each}
  </section>
</main>