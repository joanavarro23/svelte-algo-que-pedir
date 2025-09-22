<script lang="ts">
  import '$lib/components/layout/header/header.css'

  import logoUrl from '$lib/assets/logo.svg'
  import carrito from '$lib/assets/carrito.svg'
  import menu from '$lib/assets/menu.svg'
  import ingredientes from '$lib/assets/ingredientes.svg'
  import usuario from '$lib/assets/usuario.svg'
  import hamburguesa from '$lib/assets/hamburguesa-menu.svg'

  //Array de todas las urls (c/u un objeto)
  const urls = [
    { href: '/pedidos-actuales', icono: carrito, label: 'Pedidos' },
    { href: '/menu', icono: menu, label: 'Menu' },
    { href: '/ingrediente', icono: ingredientes, label: 'Ingredientes' },
    { href: '/perfil-local', icono: usuario, label: 'Cuenta' }
  ]
</script>

<header class="header-pagina">
  <nav class="barra-navegacion">
    <!-- Toda la barra de navegacion del header -->
    <a href="/" class="container-logo">
      <img class="logo-app" src={logoUrl} alt="Algo que pedir" />
      <h4>Algo que Pedir</h4>
    </a>

    <ul class="ul-links">
      <!-- Lista de enlaces de navegacion -->
      {#each urls as { href, icono, label } (href)}
        <li class="items-navegacion">
          <a class="links-navegacion" {href} aria-label={label}>
            <img class="iconos-navegacion" src={icono} alt="" aria-hidden="true" />
            <span>{label}</span>
          </a>
        </li>
      {/each}
    </ul>

    <div class="container-usuario">
      <button class="hamburguesa">
        <img class="hamburguesa-icono" src={hamburguesa} alt="" />
      </button>

      <a class="vista-activa" href=""></a>
      <!-- falta function para obtener la vista activa -->

      <!--<img class="usuario-logo" src="/usuario-chica.svg" alt="Cuenta" /> -->
    </div>
  </nav>
</header>
