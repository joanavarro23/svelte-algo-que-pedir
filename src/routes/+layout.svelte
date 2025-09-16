<script lang="ts">
	import './general.css'
	import Logo from '$lib/assets/logo.svg'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={Logo} />
</svelte:head>

{@render children()}