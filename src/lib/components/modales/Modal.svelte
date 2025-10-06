<script lang="ts">
  export let open: boolean
  export let onClose: () => void
  export let componente: any = null
  export let props: any = {}
</script>

{#if open}
  <div class="overlay" on:click={() => onClose()}>
    <div class="modal" on:click|stopPropagation>
      <button class="cerrar" on:click={onClose}>✕</button>

      {#if componente}
        <svelte:component this={componente} {...props} />
      {/if}
    </div>
  </div>
{/if}

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  outline: none;
}

.modal {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  min-width: 500px;
  max-width: 1200px;
  width: 80%;
  max-height: 95%;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}


.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
