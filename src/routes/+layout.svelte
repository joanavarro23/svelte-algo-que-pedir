<script lang="ts">
	import './(app)/pedidos-actuales.css'
	import './general.css'
	import Logo from '$lib/assets/logo.svg'
	import Toast from '$lib/components/toasts/Toast.svelte'

	let { children } = $props()
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Nata+Sans:wght@100..900&display=swap" rel="stylesheet">
	<link rel="icon" href={Logo} />
</svelte:head>
<Toast />

{@render children()}