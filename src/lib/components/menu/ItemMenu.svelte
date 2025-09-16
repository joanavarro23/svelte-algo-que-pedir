<script lang='ts'>
  import './menu.css'
  import type { Plato } from './platos'

  type ItemMenuProps = { 
    plato: Plato,
    key: number 
  }

  let { plato, key }: ItemMenuProps = $props()
</script>

<li class="item-menu">
  <figure class="detalles-menu" data-testid={"item-" + key}>
      <img src={plato.imagen} class="imagen-menu">
      <figcaption>
          <p>{plato.titulo}</p>
          <p class="descripcion-plato">{plato.descripcion}</p>
      </figcaption>
  </figure>
  <div class="precio-menu">
      <span>${plato.precio}</span>
  </div>
</li>