<script lang="ts">
  import './detalle-pedido.css'
  import usuarioIcono from '$lib/assets/usuario.svg'
  import pinUbicacionIcono from '$lib/assets/pin-ubicacion.svg'
  import tarjetaCreditoIcono from '$lib/assets/tarjeta-credito.svg'

  //import { pedidos } from '$lib/types/pedido'
  import { PLATOS_MOCK } from '$lib/data/mocks/platosMock'
  import { EstadoDelPedido } from '$lib/types/pedido'

  import Tabla from '$lib/components/generales/tabla/Tabla.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import PedidoRow from '$lib/components/detalle-pedido/pedidoRow.svelte'
  import EstadoBadge from '$lib/components/detalle-pedido/estadoBadge.svelte'

  const itemsPedido = [
    { ...PLATOS_MOCK[0], cantidad: 1 }, // Hamburguesa con Queso
    { ...PLATOS_MOCK[1], cantidad: 1 }, // Papas Fritas
    { ...PLATOS_MOCK[2], cantidad: 1 } // Refresco
  ]

  const subtotal = itemsPedido.reduce(
    (monto, plato) => monto + Number(plato.precio) * plato.cantidad,
    0
  )
  const comisionDelivery = subtotal * 0.02
  const incrementoPago = subtotal * 0.055
  const total = subtotal + comisionDelivery + incrementoPago

  //hasta tener el componente queda hardcodeado asi
  const pedidoDetalle = {
    id: '12345',
    estado: EstadoDelPedido.Cancelado,
    cliente: {
      nombre: 'Sofia Miller',
      usuario: 'smiller2005'
    },
    direccion: {
      calle: 'Av. Siempre Viva 555',
      detalles: 'Lp 05, 1798 Tay - 19-09047'
    },
    items: itemsPedido,
    pago: {
      subtotal,
      comisionDelivery,
      incrementoPago,
      total,
      metodo: 'Pago con tarjeta de crédito'
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
      <div class="cliente-content">
        <img src={usuarioIcono} class="icono" alt="Cliente" />
        <div class="cliente-texto">
          <span class="texto-principal">{pedidoDetalle.cliente.nombre}</span>
          <span class="texto-secundario"><b>Usuario:</b> {pedidoDetalle.cliente.usuario}</span>
        </div>
      </div>
    </div>
    <div class="cliente-info">
      <h2>Dirección de entrega</h2>
      <div class="cliente-content">
        <img src={pinUbicacionIcono} class="icono" alt="Ubicacion" />
        <div class="cliente-texto">
          <span class="texto-principal">{pedidoDetalle.direccion.calle}</span>
          <span class="texto-secundario">{pedidoDetalle.direccion.detalles}</span>
        </div>
      </div>
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
        <img src={tarjetaCreditoIcono} class="icono" alt="Metodo de pago" />
        <p>{pedidoDetalle.pago.metodo}</p>
      </div>
    </div>
  </section>

  <div class="boton-volver">
    <Boton tipo="primario" onclick={volver}>Volver</Boton>
  </div>
</main>
