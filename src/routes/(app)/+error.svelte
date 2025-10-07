<script lang="ts">
  import { page } from '$app/state'
  import errorImg  from '$lib/assets/errorImg.png'
</script>
<div class="error-contenedor">
  <h1>Error: {page.status}</h1>
  <p>{page.error?.message ?? 'Error desconocido, contactese con el administrador de la página.'}</p>
  <img src={errorImg} alt="Imagen de error">
</div>

<style>
  .error-contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  p {
    color: red;
  }
  img {
    max-width: 600px;
  }
</style>