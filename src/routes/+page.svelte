<script lang="ts">
	import { PrivateMarketplaceApi } from '@/api/marketplaceApi';

	import NavItem from '../components/NavItem.svelte';

	let categories: any[] = [];

	async function loadData() {
		categories = (await PrivateMarketplaceApi.listCategory(0, 15)).data.content as any[];
	}

	loadData();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Hello world</h1>
	<div class="sidebar">
		<h2 style="text-align: center; font-size: 36px; margin-top: 2vw;">Navigation</h2> 
		<ul class="nav flex-column">
			{#each categories as category}
				<NavItem data={category} />
			{/each}
		</ul>
	</div>
</section>
