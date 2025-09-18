<script lang="ts">
  import Input from '$lib/components/generales/input/input.svelte'
  import { platos } from '../menu/platos'
</script>

<!-- Descripción del plato -->
{#if plato}
  <section class="contenedor-general editar-plato">
    <form>
      <Input nombre_label="Nombre del plato*" type="text" id="nombre" bind:value={????} 
      placeholder="Ingrese el nombre del plato" maxlength=30 required
      />

      <div class="label-input">
        <label for="descripcion">Descripción*</label>
        <textarea class="textarea-descripcion"
        id="descripcion" bind:value={platos.descripcion}
        placeholder="Ingrese una descripción significativa para el plato" required></textarea>
      </div>

      <Input nombre_label="URL de la imagen del plato*" type="file" id="imagen" 
      bind:value={????} required
      />
    </form>
    
    <!-- Imagen de referencia -->
    <div class="editar-plato__imagen">
        <img class="foto" src={hamburguesa} alt="Vista previa del plato">
    </div>
  </section> 
