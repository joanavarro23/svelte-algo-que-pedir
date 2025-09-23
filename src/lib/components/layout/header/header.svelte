<script lang="ts">
  import '$lib/components/layout/header/header.css'
  import '$lib/components/generales/boton/boton.css'
  import { page } from '$app/state'

  import logoUrl from '$lib/assets/logo.svg'
  import carrito from '$lib/assets/carrito.svg'
  import menu from '$lib/assets/menu.svg'
  import ingredientes from '$lib/assets/ingredientes.svg'
  import usuarioIcono from '$lib/assets/usuario.svg'
  import hamburguesa from '$lib/assets/hamburguesa-menu.svg'
  import usuarioInfo from '$lib/assets/usuario-chica.svg'

  //Array de todas las urls (c/u un objeto)
  const urls = [
    { href: '/pedidos-actuales', icono: carrito, label: 'Pedidos' },
    { href: '/menu', icono: menu, label: 'Menu' },
    { href: '/ingrediente', icono: ingredientes, label: 'Ingredientes' },
    { href: '/perfil-local', icono: usuarioIcono, label: 'Cuenta' }
  ]

  //Arrow function para obtener la pagina activa que se muestra al lado del menu hamburguesa 
  const paginaActiva = () => {
    const rutaActual = page.url.pathname    //Obtengo la ruta actual
    return urls.find(i => rutaActual.startsWith(i.href)) ?? urls[0]           //Recorro el array de objetos y busco la ruta cuyo href coincide con la ruta actual - la default route es la pag principal
  }
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
            <img
              class="iconos-navegacion"
              src={icono}
              alt="Links navegacion pagina"
              aria-hidden="true"
            />
            <span>{label}</span>
          </a>
        </li>
      {/each}
    </ul>

    <div class="container-usuario">
      <!-- Container del icono usuario + hamburguesa -->
      <a class="vista-activa" href={paginaActiva().href}>{paginaActiva().label}</a>
      
      <button class="hamburguesa">
        <img class="hamburguesa-icono" src={hamburguesa} alt="Menu desplegable" />
      </button>

      <img class="usuario-logo" src={usuarioInfo} alt="Cuenta" />
    </div>
  </nav>
</header>
