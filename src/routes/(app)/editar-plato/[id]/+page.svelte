<script>
  import './editar-plato.css'
  import hamburguesa from '$lib/assets/hamburguesa-preview.jpg'
  import { page } from '$app/state'
  import Input from '$lib/components/generales/input/input.svelte'
  import Switch from '$lib/components/generales/switch/switch.svelte'
//   import Boton from '$lib/components/generales/boton/boton.svelte'
 

  let nombre = $state('Hamburguesa completa con cheddar')
  let descripcion = $state('Breve descripción de los ingredientes o preparación del plato')
  let imagen = $state(hamburguesa)
</script>

<main class="main-vista vista-editar-plato">
    <h1 class="titulo">Editar Plato {page.params.id}</h1>

    <!-- Descripción del plato -->
    <section class="contenedor-general editar-plato">
        <form>
            <Input nombre_label="Nombre del plato*" type="text" id="nombre"
            bind:value={nombre} maxlength={30} />

            <Input id="descripcion" nombre_label="Descripcion*" textarea={true}
            bind:value={descripcion} type="" />

            <Input nombre_label="URL de la imagen del plato*" type="file" id="imagen"
            bind:value={imagen} placeholder="Seleccione una imagen del archivo" />
        </form>
        
        <!-- COMO CONECTO LA IMAGEN !!! ??? -->
        <!-- Imagen de referencia -->
        <!-- <div class="editar-plato__imagen">
            <img class="foto" src={hamburguesa} alt="Vista previa del plato">
        </div> -->
    </section> 

    <!-- Costos del plato -->
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Costos</h2>
        <form>
            <Input nombre_label="Precio Base*" type="number" id="precio" placeholder="Ej: 500" />
            <div>
                <Switch id="platoDeAutor" titulo="Plato de Autor" 
                subtitulo="Aplica un porcentaje adicional al precio de venta" />
            </div>
            <div>
                <Switch id="platoDePromocion" titulo="Plato en Promoción"
                subtitulo="Aplica un descuento al precio de venta" />
            </div> 
        </form>
    </section>

    <!-- Detalle de los ingredientes --> 
    <section class="contenedor-general contenedor-general_especifico">
        <h2>Ingredientes</h2>
        <div class="contenedor_titulo-span">
            <h3 class="subtitulo">Costo de producción</h3><span>$ 100</span>
        </div>
    </section>

  <!-- TABLA CONFIGURAR COMO COMPONENTE
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
 -->

  <!-- Botones finales -->
  <!-- <div class="botones-juntos">
    <Boton nombre="Guardar cambios"/>
    <Boton tipo='secundario' nombre="Descartar cambios"/>
  </div> -->
</main>