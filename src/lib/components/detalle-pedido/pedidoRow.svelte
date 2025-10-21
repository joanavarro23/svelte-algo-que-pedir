<script lang="ts">
  import './pedidoRow.css'
  import type { Plato } from '$lib/models/plato.svelte.ts'

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
    <img src={item.imagenUrl} class="icono" alt={item.nombre} />
    <div>
      <span class="texto-principal">{item.nombre}</span><br />
      <span class="texto-secundario">{item.descripcion}</span>
    </div>
  </td>
  <td>{item.cantidad}</td>
  <td>${Number(item.precio).toFixed(2)}</td>
</tr>
