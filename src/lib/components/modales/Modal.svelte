<script lang="ts">
  import { fade } from 'svelte/transition'

  export let open = false
  export let onClose: () => void
  export let content: any // componente a renderizar dentro del modal

  // cerrar con Escape
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose?.()
  }
</script>

{#if open}
  <div
    class="overlay"
    role="button"
    tabindex="0"
    on:click={() => onClose?.()}
    on:keydown={handleKeydown}
    transition:fade={{ duration: 200 }}
  >
    <div class="modal" on:click|stopPropagation transition:fade={{ duration: 200 }}>
      <button class="close-btn" on:click={onClose}>✕</button>
      {#if content}
        <svelte:component this={content} />
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
  outline: none; /* el foco se mantiene en div pero sin outline */
}

.modal {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  min-width: 300px;
  max-width: 90%;
  max-height: 90%;
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
