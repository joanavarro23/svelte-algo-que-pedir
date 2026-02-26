<script lang="ts">
  import Boton from '$lib/components/generales/boton/boton.svelte'

  interface Props {
      mensaje: string
      onConfirm: () => void
      mostrarModal: boolean
    }

  let dialog = $state<HTMLDialogElement | null>(null)
  let { mensaje, onConfirm, mostrarModal = $bindable() }: Props = $props()
  $effect(() => {
    if (mostrarModal) {
      dialog?.showModal()
    } else {
      if (dialog?.open) dialog.close()
    }
  })
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} onclose={() => (mostrarModal = false)} onclick={(e) => { if(e.target === dialog) dialog?.close() }} class="modal-confirmar">
  <p style="padding: 0.7rem">{mensaje}</p>
  <div>
    <Boton onclick={onConfirm} tipo="primario">Confirmar</Boton>
    <Boton onclick={() => dialog?.close()} tipo="secundario">Cancelar</Boton>
  </div>
</dialog>

<style>
  @import './modal-confirmar.css';
</style>