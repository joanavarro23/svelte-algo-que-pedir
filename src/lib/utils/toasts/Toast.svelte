<script lang="ts">
  import './toast.css'
  import { toast, showToast } from './toasts'

</script>

{#if $toast}
  <div class="toast {$toast.type}">
    {$toast.message}
  </div>
{/if}