<script lang="ts">
  import './detalle-pedido.css'
  import { iconoMedioDePago } from '$lib/utils/medioPagoIcono'

  import { PEDIDOS_MOCK } from '$lib/data/mocks/pedidosMock'
  import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'
  import { Plato } from '$lib/models/plato.svelte'
  import { EstadoDelPedido, MedioDePago } from '$lib/types/pedido'
  //DEPRECATED PERO ESTOY HACIENDO EL SERVICE
  import { page } from '$app/stores'

  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import PedidoRow from '$lib/components/detalle-pedido/pedidoRow.svelte'
  import EstadoBadge from '$lib/components/detalle-pedido/estadoBadge.svelte'
  import UsuarioSection from '$lib/components/pedidos/usuario-section.svelte'
  import DireccionSection from '$lib/components/pedidos/direccion-section.svelte'

  const pedidoId = Number($page.params.id)
  const pedido = PEDIDOS_MOCK.find((p) => p.id === pedidoId)

  // Generar items del pedido con datos de platos mockeados (que quilombo, cambiar por service lo antes posible para poder usar ID bien)
  type PlatoConCantidad = Plato & { cantidad: number }
  let itemsPedido: PlatoConCantidad[] = []

  if (pedido) {
    itemsPedido = Array.from({ length: pedido.items }, (_, i) => {
      const plato = PLATOS_MOCK[i % PLATOS_MOCK.length]
      return Object.assign(plato, { cantidad: 1 }) as PlatoConCantidad
    })
  }

  const subtotal = itemsPedido.reduce((monto, plato) => monto + plato.precio * plato.cantidad, 0)
  const comisionDelivery = subtotal * 0.02
  const incrementoPago = subtotal * 0.055
  const total = subtotal + comisionDelivery + incrementoPago

  const pedidoDetalle = {
    id: pedido?.id.toString(),
    estado: pedido?.estado ?? EstadoDelPedido.Pendiente,
    cliente: {
      nombre: pedido?.cliente,
      usuario: pedido?.cliente.toLowerCase().replace(' ', '')
    },
    direccion: {
      calle: pedido?.direccion
    },
    items: itemsPedido,
    pago: {
      subtotal,
      comisionDelivery,
      incrementoPago,
      total,
      metodo: pedido?.medioDePago ?? MedioDePago.Efectivo
    }
  }

  function volver() {
    history.back()
  }
</script>

<main class="main-vista">
  <section class="contenedor-estado">
    <h1>Pedido #{pedidoDetalle.id}</h1>
    <div>
      <h2>Estado del Pedido</h2>
      <EstadoBadge estado={pedidoDetalle.estado} />
    </div>
  </section>
  <section class="contenedor-general contenedor-info">
    <div class="cliente-info">
      <h2>Cliente</h2>
      <UsuarioSection
        nombre={pedidoDetalle.cliente.nombre}
        username={pedidoDetalle.cliente.usuario}
      />
    </div>
    <div class="cliente-info">
      <h2>Dirección de entrega</h2>
      <DireccionSection direccion={pedidoDetalle.direccion.calle} />
    </div>
  </section>

  <section class="contenedor-general">
    <h2>Resumen del Pedido</h2>
    <Tabla>
      {#snippet nombreColumnas()}
        <th>Plato</th>
        <th>Cantidad</th>
        <th>Precio</th>
      {/snippet}
      {#snippet datosFilas()}
        {#each pedidoDetalle.items as item (item.id)}
          <PedidoRow {item} />
        {/each}
      {/snippet}
    </Tabla>
  </section>

  <section class="contenedor-general">
    <div class="contenedor-tabla-pago">
      <h3>Pago</h3>
      <dl class="tabla-pago">
        <dt>Subtotal</dt>
        <dd>${pedidoDetalle.pago.subtotal.toFixed(2)}</dd>
        <dt>Comisión del delivery</dt>
        <dd>${pedidoDetalle.pago.comisionDelivery.toFixed(2)}</dd>
        <dt>Incremento por tipo de pago</dt>
        <dd>${pedidoDetalle.pago.incrementoPago.toFixed(2)}</dd>
        <dt>Total</dt>
        <dd>${pedidoDetalle.pago.total.toFixed(2)}</dd>
      </dl>
      <h3>Método de Pago</h3>
      <div class="metodo-pago">
        <img src={iconoMedioDePago(pedidoDetalle.pago.metodo)} class="icono" alt="Metodo de pago" />
        <p>{pedidoDetalle.pago.metodo}</p>
      </div>
    </div>
  </section>

  <div class="boton-volver">
    <Boton tipo="primario" onclick={volver}>Volver</Boton>
  </div>
</main>
