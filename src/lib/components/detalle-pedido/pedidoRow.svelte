<script lang="ts">
  import './pedidoRow.css'
  import type { Plato } from '$lib/components/menu/platos'

  type PedidoItem = Plato & {
    cantidad: number
  }

  type PedidoRowProps = {
    item: PedidoItem
  }

  let { item }: PedidoRowProps = $props()
</script>

<tr>
  <td class="plato-detalle">
    <img src={item.imagen} class="icono" alt={item.titulo} />
    <div>
      <span class="texto-principal">{item.titulo}</span><br />
      <span class="texto-secundario">{item.descripcion}</span>
    </div>
  </td>
  <td>{item.cantidad}</td>
  <td>${Number(item.precio).toFixed(2)}</td>
</tr>
