<script>
  import './editar-ingrediente.css'
  import Input from '$lib/components/generales/input/input.svelte'
  import Switch from '$lib/components/generales/switch/switch.svelte'
</script>

<main class="vista-edicion-ingrediente main-vista">
  <!-- Contenedor de toda la vista -->
  <h1 class="titulo-edicion">Editar ingrediente</h1>
  <section class="container-edicion contenedor-general">
    <!-- Contenedor de los campos de edicion ingrediente -->
    <article class="item-input-edicion">
      <form>
        <Input
          nombre_label="Nombre del ingrediente*"
          type="text"
          id="nombre-ingrediente"
          placeholder="Ingresa el nombre del ingrediente..."
          required={true}
        />

        <Input
          nombre_label="Costo*"
          type="number"
          id="costo-ingrediente"
          placeholder="Ingresa su costo..."
          required={true}
        />

        <Input
          nombre_label="Grupo Alimenticio"
          id="grupo-alimenticio"
          select={true}
          options={[
            { value: '', label: 'Selecciona una opción' },
            { value: '1', label: 'Cereales y tubérculos' },
            { value: '2', label: 'Azúcares y dulces' },
            { value: '3', label: 'Lácteos' },
            { value: '4', label: 'Frutas y verduras' },
            { value: '5', label: 'Grasas y aceites' },
            { value: '6', label: 'Proteínas' }
          ]}
          type=''
        />

        <Switch id="origen-toggle" titulo="Origen animal" />
      </form>
    </article>
  </section>
</main>
