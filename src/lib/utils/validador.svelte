<script lang="ts">
  type VistaModelo = {
    tieneError: (_: string) => boolean
    mensajesError: (_: string) => string
  }

  type ValidadorProps = {
    elemento: VistaModelo
    atributo: string
  }

  let { elemento, atributo }: ValidadorProps = $props()
</script>

{#if elemento.tieneError(atributo)}
  <div class="validacion-fila">
    <div data-testid={`errorMessage-${atributo}`}>
      {elemento.mensajesError(atributo)}
    </div>
  </div>
{/if}

<style>
  .validacion-fila{
    background-color: lightsalmon;
    border: 1px solid darkred;
    color: darkred;
    font-size: 0.7em;
    height: 1.7em;
    display: flex;
    flex-direction: row;
    padding: 1em;
    margin: 0.75em 0;
    align-items: center;
  }
</style>