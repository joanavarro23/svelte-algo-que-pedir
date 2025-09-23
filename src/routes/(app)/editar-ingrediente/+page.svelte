<script>
  import './editar-ingrediente.css'
  import Input from '$lib/components/generales/input/input.svelte'
</script>

<main class="vista-edicion-ingrediente main-vista">
  <!-- Contenedor de toda la vista -->
  <h1 class="titulo-edicion">Editar ingrediente</h1>
  <section class="container-edicion contenedor-general">
    <!-- Contenedor de los campos de edicion ingrediente -->
    <article class="item-input-edicion">
      <form>
        <Input
          nombre="Nombre del ingrediente*"
          type="text"
          id="nombre-ingrediente"
          placeholder="Ingresa el nombre del ingrediente..."
          required={true}
        />

        <Input
          nombre="Costo*"
          type="number"
          id="costo-ingrediente"
          placeholder="Ingresa su costo..."
          required={true}
        /> 
      </form>
    </article>
  </section>
</main>
