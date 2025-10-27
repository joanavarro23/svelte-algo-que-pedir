<script lang="ts">
  import './pedidos-actuales.css'
  import PedidoCard from '$lib/components/pedidos/pedido-card.svelte'
  import { Pedido } from '$lib/models/pedido.svelte'
  import { EstadoDelPedido, estadosLabelBoton } from '$lib/models/estadosPedido'
  import { goto } from '$app/navigation'

  let { data } = $props<{ data: { estado: EstadoDelPedido, pedidos: Pedido[] } }>()

  //Por default la vista arranca con el filtrado de los pedidos Pendientes
  let estadoActivo = $state<EstadoDelPedido>(data.estado ?? EstadoDelPedido.PENDIENTE)

  //Mantiene el filtrado si volves atras
  $effect(() => {
    if (data.estado) estadoActivo = data.estado
  })

  //Filtrado de los pedidos segun el estado activo
  const pedidosFiltrados = $derived<Pedido[]>(
    (data.pedidos ?? []).filter((it : Pedido) => it.estadoPedido === estadoActivo)
  )
  
  //Cambia el estado activo por el seleccionado tras el onclick
  const switchEstado = (nuevoEstado: EstadoDelPedido) => {
    estadoActivo = nuevoEstado
    goto(`/pedidos?estado=${nuevoEstado}`)
  }
</script>

<main class="container-principal main-vista">
  <!-- Contenedor de toda la vista -->
  <h1>Pedidos actuales</h1>

  <nav class="container-estados">
    <!-- Contenedor de los estados de los pedidos -->
    {#each estadosLabelBoton as { estado, label } (label)}
      <button
        type="button"
        class="link-estados {estadoActivo === estado ? 'estado-activo' : ''}"
        onclick={() => switchEstado(estado)}
        >{label}
      </button>
    {/each}
  </nav>

  <section class="container-tarjetas">
    <!-- Contenedor de las tarjetas de pedidos -->
    <!-- Si esta vacia la lista filtrada va al else -->
    {#if pedidosFiltrados.length}
      {#each pedidosFiltrados as pedido (pedido.id)}
        <PedidoCard {pedido} />
      {/each}
    {:else}
      <p class="estado-notfound">No se encontraron pedidos</p>
    {/if}
  </section>
</main>
