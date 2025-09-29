<script lang="ts">
  import type { Pedido } from '$lib/types'
  import { MedioDePago } from '$lib/types'
  import UsuarioSection from '$lib/components/pedidos/usuario-section.svelte'


  import pinUbicacion from '$lib/assets/pin-ubicacion.svg'
  import tarjetaIcono from '$lib/assets/tarjeta-credito.svg'
  import efectivoIcono from '$lib/assets/efectivo.svg'
  import QRIcono from '$lib/assets/codigo-qr.svg'

  interface Props {
    pedido: Pedido
  }

  const { pedido }: Props = $props()

  const pedidoHora = (fecha: Date): string => {
    /* Extra de un tipo Date la hh:mm */
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const iconoMedioDePago = (medio: MedioDePago): string => {
    /* Para el renderizado de iconos de medio de pago diferentes */
    if (medio === MedioDePago.Efectivo) {
      return efectivoIcono
    } else if (medio === MedioDePago.QR) {
      return QRIcono
    } else {
      return tarjetaIcono
    }
  }
</script>

<article class="pedido-tarjeta contenedor-general">
  <!-- Tarjeta de pedido -->
  <header class="pedido-header">
    <p>Pedido #{pedido.id}</p>

  <!--Componente info de usuario-->
  <UsuarioSection/>

    <p class="info-pedido">
      Hora: {pedidoHora(pedido.fecha)} | Articulos: {pedido.items} | Total: ${pedido.precio}
    </p>
  </header>

  <section class="info-direccion">
    <img src={pinUbicacion} alt="" class="pin-ubicacion" />
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
