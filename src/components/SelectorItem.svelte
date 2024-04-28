<script>
	// export let handler: (element: any) => void;
	export let item;
</script>

<section>
	<button
		class="btn btn-success list-group-item"
		on:click={() => {
			// handler(item);
		}}>Select</button
	>
	<slot {item}/>
</section>
