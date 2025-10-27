<script lang="ts">
  import type { Pedido } from '$lib/models/pedido.svelte'
  import UsuarioSection from '$lib/components/pedidos/usuario-section.svelte'
  import DireccionSection from './direccion-section.svelte'

  import { iconoMedioPago } from '$lib/utils/medioPagoIcono'
  import { goto } from '$app/navigation'

  interface Props {
    pedido: Pedido
  }

  const { pedido }: Props = $props()

  // Redirige al detalle del pedido, toma el id del pedido para armar la ruta
  const redireccionADetalle = () => goto(`/detalle-pedido/${pedido.id}`)
</script>

<article class="pedido-tarjeta contenedor-general" onclick={redireccionADetalle}>
  <!-- Tarjeta de pedido -->
  <header class="pedido-header">
    <p>Pedido #{pedido.id}</p>

    <!--Componente info de usuario-->
    <UsuarioSection nombre={pedido.cliente.nombre} />

    <p class="info-pedido">
      Hora: {pedido.hora} | Articulos: {pedido.items} | Total: ${pedido.precioTotal.toFixed(2)}
    </p>
  </header>

  <!--Componente info de direccion-->
  <DireccionSection
    direccion={pedido.direccion.direccion}
    latitud={pedido.direccion.latitud}
    longitud={pedido.direccion.longitud}
  />

  <footer class="pedido-footer">
    <div class="modo-pago">
      <img src={iconoMedioPago(pedido.medioDePago)} alt="modo de pago" class="icono-pago" />
      <p><b>Pago con {pedido.medioDePago}</b></p>
    </div>
  </footer>
  <button class="boton-primario boton-preparar">Preparar</button>
</article>
