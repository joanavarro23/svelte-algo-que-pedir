<script lang="ts">
  import '$lib/components/layout/header/header.css'
  import logoUrl from '$lib/assets/logo.svg' //esa alternativa o mover todos los svg a static para citar la ruta absoluta como antes
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
      <li class="items-navegacion">
        <a class="links-navegacion" href="/pedidos-actuales">
          <!-- <img class="iconos-navegacion" src="../assets/carrito.svg"/> -->
          <span>Pedidos</span>
        </a>
      </li>
      <li class="items-navegacion">
        <a class="links-navegacion" href="/menu">
          <!-- <img class="iconos-navegacion" src="../assets/menu.svg"/> -->
          <span>Menu</span>
        </a>
      </li>
      <li class="items-navegacion">
        <a class="links-navegacion" href="/ingrediente">
          <!-- <img class="iconos-navegacion" src="../assets/ingredientes.svg"/> -->
          <span>Ingredientes</span>
        </a>
      </li>
      <li class="items-navegacion">
        <a class="links-navegacion" href="/perfil-local">
          <!-- <img class="iconos-navegacion" src="../assets/usuario.svg"/> -->
          <span>Cuenta</span>
        </a>
      </li>
    </ul>

    <div class="container-usuario">
      <div class="hamburguesa">
        <!-- <img class="hamburguesa-icono" src="../assets/hamburguesa-menu.svg"/> -->
      </div>
      <!-- <img class="usuario-logo" src="../assets/usuario-chica.svg"/> -->
    </div>
  </nav>
</header>
