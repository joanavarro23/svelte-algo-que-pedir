<!-- <script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  export let open: boolean
  export let onClose: () => void
  export let componente: any = null
  export let props: any = {}

  import './modal.css'

  // Cerrar modal con tecla "Esc"
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      onClose()
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
    }
  })

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

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
{/if} -->
