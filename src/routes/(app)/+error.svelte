<script lang="ts">
  import { page } from '$app/state'
  import errorImg  from '$lib/assets/errorImg.png'
</script>

<h1>Error: {page.status}</h1>
<p>{page.error?.message ?? 'Error desconocido, contactese con el administrador de la página.'}</p>
<img src={errorImg} alt="Imagen de error">

<style>
  h1, p, img {
    align-items: center;
  }
  p {
    color: red;
  }
  img {
    max-width: 300px;
  }
</style>