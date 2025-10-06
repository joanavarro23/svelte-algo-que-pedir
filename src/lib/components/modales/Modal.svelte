<script lang="ts">
  export let open: boolean
  export let onClose: () => void
  export let componente: any = null
  export let props: any = {}

  import './modal.css'
</script>

{#if open}
  <div class="overlay" on:click={() => onClose()}>
    <div class="modal" on:click|stopPropagation>
      <button class="close-btn" on:click={onClose}>Cerrar</button>

      {#if componente}
        <svelte:component this={componente} {...props} />
      {/if}
    </div>
  </div>
{/if}


