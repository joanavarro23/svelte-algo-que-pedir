<script lang="ts">
  import type { Pedido } from '$lib/types'
  import { MedioDePago } from '$lib/types'

  interface Props {
    pedido: Pedido
  }

  const { pedido }: Props = $props()

  const pedidoHora = (fecha: Date): string => {
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const iconoMedioDePago = (medio: MedioDePago): string => {
    if (medio === MedioDePago.Efectivo) {
      return '/assets/efectivo-icon.svg'
    } else if (medio === MedioDePago.QR) {
      return '/assets/codigo-qr.svg'
    } else {
      return '/assets/tarjeta-credito.svg'
    }
  }
</script>

<article class="pedido-tarjeta contenedor-general">
  <!-- Tarjeta de pedido -->
  <header class="pedido-header">
    <p>Pedido #{pedido.id}</p>

    <section class="info-usuario">
      <img src="/assets/pedido-user-icon.png" alt="usuario" class="icono-usuario-pedido" />
      <div class="nombre-usuario">
        <h4>{pedido.cliente}</h4>
        <p><b>usuario: </b>smiller2005</p>
        <!-- FALTA PENSAR USUARIO -->
      </div>
    </section>

    <p class="info-pedido">
      Hora: {pedidoHora(pedido.fecha)} | Articulos: {pedido.items} | Total: ${pedido.precio}
    </p>
  </header>

  <section class="info-direccion">
    <img src="/assets/pin-ubicacion.svg" alt="" class="pin-ubicacion" />
    <div class="direccion-coordenadas">
      <h4>{pedido.direccion}</h4>
      <p>Lat: 407128, Long: -740060</p>
      <!-- FALTA PENSAR LAT/LONG DE DIRECCION -->
    </div>
  </section>

  <footer class="pedido-footer">
    <div class="modo-pago">
      <img src={iconoMedioDePago(pedido.medioDePago)} alt="modo de pago" class="icono-pago" />
      <p><b>Pago con {pedido.medioDePago}</b></p>
    </div>
  </footer>
  <button class="boton-primario boton-preparar">Preparar</button>
</article>
