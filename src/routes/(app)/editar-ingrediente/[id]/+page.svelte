<script lang='ts'>
  import { page } from '$app/state'
  import './editar-ingrediente.css'
  import Input from '$lib/components/generales/input/input.svelte'
  import Switch from '$lib/components/generales/switch/switch.svelte'
  import Textarea from '$lib/components/generales/input/textarea.svelte'
  import Boton from '$lib/components/generales/boton/boton.svelte'
  import { GrupoAlimenticio } from '$lib/models/ingrediente.svelte'

  let { data } = $props()

  const titulo = $derived(`Editar Ingrediente ${data.ingrediente.id}: ${data.ingrediente?.nombre ?? ''}`)
  const opcionesGrupo = [
    GrupoAlimenticio.CEREALES_Y_TUBERCULOS,
    GrupoAlimenticio.AZUCARES_Y_DULCES,
    GrupoAlimenticio.LACTEOS,
    GrupoAlimenticio.FRUTAS_Y_VERDURAS,
    GrupoAlimenticio.GRASAS_Y_ACEITES,
    GrupoAlimenticio.PROTEINAS
  ].map(v => ({ value: v, label: v }))
</script>

<main class="vista-edicion-ingrediente main-vista">
  <!-- Contenedor de toda la vista -->
  <h1 class="titulo-edicion">{titulo}</h1>
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
          bind:value={data.ingrediente.nombre}
        />

        <Input
          nombre_label="Costo*"
          type="number"
          id="costo-ingrediente"
          placeholder="Ingresa su costo..."
          required={true}
          bind:value={data.ingrediente.costo}
        />

        <Textarea
          nombre_label="Grupo Alimenticio"
          id="grupo-alimenticio"
          select={true}
          options={[{ value: '', label: 'Selecciona una opción' }, ...opcionesGrupo]}
          bind:value={data.ingrediente.grupo}
        />
        <article class="origen-toggle">
          <Switch id="origen-toggle" titulo="Origen animal" bind:checked={data.ingrediente.esAnimal} />
        </article>
      </form>
    </article>
  </section>
  <div class="container-botones-edicion">             <!-- Contenedor de los botones de guardar y descartar cambios -->
      <Boton data-testid="btnGuardar" type="submit" class="boton-primario boton-guardar">Guardar cambios</Boton>
      <Boton data-testid="btnDescartar" class="boton-secundario boton-descartar">Descartar cambios</Boton>
  </div>
</main>
