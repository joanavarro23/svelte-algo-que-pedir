<script lang="ts">
  import './pedidos-actuales.css'
  import PedidoCard from '$lib/components/pedidos/pedido-card.svelte'
  import { EstadoDelPedido, type Pedido } from '$lib/models/pedido.svelte'
  import { goto } from '$app/navigation'

  const { data } = $props<{ data: { estado: EstadoDelPedido | null, pedidos: Pedido[] } }>()

  //Defino array de estados asociandolo con un String para su uso
  const estados: { estado: EstadoDelPedido; label: string }[] = [
    { estado: EstadoDelPedido.PENDIENTE, label: 'Pendientes' },
    { estado: EstadoDelPedido.PREPARADO, label: 'Preparados' },
    { estado: EstadoDelPedido.ENTREGADO, label: 'Entregados' },
    { estado: EstadoDelPedido.CANCELADO, label: 'Cancelados' }
  ]

  //Por default la vista arranca con el filtrado de los pedidos Pendientes
  let estadoActivo = $state<EstadoDelPedido>(data.estado ?? EstadoDelPedido.PENDIENTE)

  //Mantiene el filtrado si volves atras
  $effect(() => {
    if (data.estado) estadoActivo = data.estado
  })

  //Filtrado de los mocks de pedidos segun el estado activo
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
    {#each estados as { estado, label } (label)}
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
