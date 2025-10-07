<script lang="ts">
	import './(app)/pedidos-actuales.css'
	import './general.css'
	import Logo from '$lib/assets/logo.svg'

	let { children } = $props()
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Nata+Sans:wght@100..900&display=swap" rel="stylesheet"> <!-- fuentes -->
	<link rel="icon" href={Logo} />
</svelte:head>

{@render children()}