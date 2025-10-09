<script lang="ts">
  import type { Pedido } from '$lib/types'
  import UsuarioSection from '$lib/components/pedidos/usuario-section.svelte'
  import DireccionSection from './direccion-section.svelte'

  import { iconoMedioDePago } from '$lib/utils/medioPagoIcono'
  import { goto } from '$app/navigation'

  interface Props {
    pedido: Pedido
  }

  const { pedido }: Props = $props()

  const pedidoHora = (fecha: Date): string => {
    /* Extrae de un tipo Date la hh:mm */
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Redirige al detalle del pedido, toma el id del pedido para armar la ruta
  const redireccionADetalle = () => goto(`/detalle-pedido/${pedido.id}`)
</script>

<article class="pedido-tarjeta contenedor-general" onclick={redireccionADetalle}>
  <!-- Tarjeta de pedido -->
  <header class="pedido-header">
    <p>Pedido #{pedido.id}</p>

    <!--Componente info de usuario-->
    <UsuarioSection nombre={pedido.cliente} />

    <p class="info-pedido">
      Hora: {pedidoHora(pedido.fecha)} | Articulos: {pedido.items} | Total: ${pedido.precio}
    </p>
  </header>

  <!--Componente info de direccion-->
  <DireccionSection direccion={pedido.direccion} />

  <footer class="pedido-footer">
    <div class="modo-pago">
      <img src={iconoMedioDePago(pedido.medioDePago)} alt="modo de pago" class="icono-pago" />
      <p><b>Pago con {pedido.medioDePago}</b></p>
    </div>
  </footer>
  <button class="boton-primario boton-preparar">Preparar</button>
</article>
