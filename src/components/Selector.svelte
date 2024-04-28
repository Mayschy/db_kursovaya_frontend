<script lang="ts">
	import SelectorItem from './SelectorItem.svelte';

	let query: string = '';

	let elements: any[] = [];

	export let handler: (element: any) => void;

	export let fetchElements: (query: string, page: number) => Promise<any[]>;

	async function fetch(query: string, page: number) {
		const newElements = await fetchElements(query, page);
		elements = newElements;

		elements.forEach((it) => {
			console.log(it);
		});
	}
</script>

<section>
	<div class="container-lg border border-5 p-3 rounded-4 shadow mb-3">
		<div class="row">
			<label for="search_field">Enter query</label>
			<div class="col">
				<input class="form-control" type="text" bind:value={query} id="search_field" />
			</div>
			<div class="col">
				<button
					class="btn btn-primary"
					on:click={() => {
						fetch(query, 0);
					}}>Search</button
				>
			</div>
		</div>

		<div class="list-group">
			{#each elements as item}
				<slot {item}/>
			{/each}
		</div>
	</div>
</section>
