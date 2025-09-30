<script lang="ts">
  import { EstadoDelPedido } from '$lib/types/pedido'
  import './estadoBadge.css'

  type EstadoBadgeProps = {
    estado: EstadoDelPedido
  }

  let { estado }: EstadoBadgeProps = $props()

  const estadoColores: Record<EstadoDelPedido, string> = {
    [EstadoDelPedido.Pendiente]: '#ff9800', // Orange
    [EstadoDelPedido.Preparado]: '#2196f3', // Blue
    [EstadoDelPedido.Entregado]: '#4caf50', // Green
    [EstadoDelPedido.Cancelado]: '#f44336' // Red
  }

  const colorBadge = estadoColores[estado] || estadoColores[EstadoDelPedido.Pendiente]
</script>

<span class="estado-badge" style="background-color: {colorBadge}">
  {estado}
</span>
