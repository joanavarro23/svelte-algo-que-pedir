<script>
  import "./editar-plato.css"
  // import Boton from "$lib/components/generales/boton/boton.svelte"
  import Input from "$lib/components/generales/input/input.svelte"
</script>

<main class="main-vista">
  <h1 class="titulo">Editar Plato</h1>

  <!-- Descripción del plato -->
  <section class="contenedor-general editar-plato">
    <form>
      <Input 
      for_label="nombre"
      descripcion="Nombre del plato"
      type="text"
      id="nombre"
      value="Hambuerguesa, pero tiene que sacar la info del back"
      cantMax=30
      />
    </form>
  </section> 
<!-- 
            
  
  <div class="label-input">
      <label for="descripcion">Descrpción*</label>
      <textarea class="textarea-descripcion" id="descripcion">Breve descripción de los ingredientes o preparación del plato</textarea>
  </div>
  
          <div class="label-input">
              <label for="imagen">URL de la imagen del plato*</label>
              <input type="url" id="imagen" placeholder="http://images.google.com/altaburguer.jpg" required>
          </div>

          Imagen de referencia
      <div class="editar-plato__imagen">
          <img class="foto" src="assets\hamburguesa-preview.jpg" alt="Vista previa del plato">
      </div>
-->

  <!-- Costos del plato -->
  <!-- <section class="contenedor-general contenedor-general_especifico">
      <h2>Costos</h2>
      <form action="#">
          <div class="label-input">
              <label for="precio">Precio Base*</label>
              <input type="number" id="precio" placeholder="Ej: 500" min="0" required>
          </div>

          <div>
              <label class="switch switch-separacion" for="platoDeAutor">
                  <span class="contenedor-texto">
                      <span class="titulo-label"><b>Plato de Autor</b></span>
                      <span class="subtitulo-label">Aplica un porcentaje adicional al precio de venta</span>
                  </span>
                  <input type="checkbox" id="platoDeAutor">
                  <span class="slider"></span>
              </label>
          </div>
          <div>
              <label class="switch switch-separacion" for="platoDePromocion">
                  <span class="contenedor-texto">
                      <span class="titulo-label"><b>Plato en Promoción</b></span>
                      <span class="subtitulo-label">Aplica un descuento al precio de venta</span>
                  </span>
                  <input type="checkbox" id="platoDePromocion">
                  <span class="slider"></span>
              </label>
          </div>
      </form>
  </section> -->

  <!-- Detalle de los ingredientes -->
  <!-- <section class="contenedor-general contenedor-general_especifico">
      <h2>Ingredientes</h2>
      <div class="contenedor_titulo-span">
          <h3 class="subtitulo">Costo de producción</h3><span>$ 100</span>
      </div>
      <article class="contenedor-tabla">
          <table>
              <thead>
                  <tr>
                      <th>Nombre</th>
                      <th>Grupo</th>
                      <th class="icono">Origen</th>
                      <th class="icono">Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Carne de Red</td>
                      <td>Proteínas</td>
                      <td class="icono"><img src="assets/cow.svg"></td>
                      <td class="icono">
                          <button class="boton-icono" type="button" aria-label="Eliminar">
                              <img src="assets/trash.svg" alt="">
                          </button>
                      </td>
                  </tr>
                  <tr>
                      <td>Queso Cheddar</td>
                      <td>Lácteos</td>
                      <td class="icono"><img src="assets/cow.svg"></td>
                      <td class="icono">
                          <button class="boton-icono" type="button" aria-label="Eliminar">
                              <img src="assets/trash.svg" alt="">
                          </button>
                      </td>
                  </tr>
                  <tr>
                      <td>Lechuga</td>
                      <td>Frutas y verduras</td>
                      <td class="icono"><img src="assets/palta.svg"></td>
                      <td class="icono">
                          <button class="boton-icono" type="button" aria-label="Eliminar">
                              <img src="assets/trash.svg" alt="">
                          </button>
                      </td>
                  </tr>
                  <tr>
                      <td>Tomate</td>
                      <td>Frutas y verduras</td>
                      <td class="icono"><img src="assets/palta.svg"></td>
                      <td class="icono">
                          <button class="boton-icono" type="button" aria-label="Eliminar">
                              <img src="assets/trash.svg" alt="">
                          </button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </article>
  </section> -->

  <!-- Botones finales -->
  <!-- <div class="botones-juntos">
      <button class="boton boton-primario">Guardar cambios</button>
      <button class="boton boton-secundario">Descartar cambios</button>
  </div> -->
</main>