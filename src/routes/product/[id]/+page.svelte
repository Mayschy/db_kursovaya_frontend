<script lang="ts">
	import { page } from '$app/stores';
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICommentDto,
		type IProductDto
	} from '@/api/marketplaceApi';
	const productId: string = $page.params.id;

	let commentRequest = {
		productId: productId,
		content: '',
		rate: 5
	};

	async function loadData() {
		const product = (await PrivateMarketplaceApi.getProduct(productId)).data as IProductDto;
		const comments = (await PrivateMarketplaceApi.listComments(productId, 0, DEFAULT_PAGE_SIZE))
			.data.content as ICommentDto[];

		return {
			product: product,
			comments: comments
		};
	}
</script>

<section>
	{#await loadData() then { product, comments }}
		{#if product != undefined}
			<div class="product-container">
				<div class="product-image">
					{#each product.images as image}
						<img src={image} alt="" />
					{/each}
				</div>
				<div class="product-details">
					<h1 class="product-title">Title: {product.caption}</h1>
					<p class="product-description">Description: {product.description}</p>
					<p class="product-price">${product.actualPrice}</p>
					<p class="product-specs"><strong>Specifications:</strong></p>
					<div class="border rounded-4 shadow-lg pt-3 ps-3">
						{#each Object.entries(product.characteristics) as spec}
							<p><b>{spec[0]}:</b> {spec[1]}</p>
						{/each}
					</div>
					<div class="comments">
						<strong>Comments:</strong>
						{#each comments as comment}
							<div>
								<p>{comment.ownerId}</p>
								<p>{comment.content}</p>
								<p>Rate: {comment.rate} / 5</p>
							</div>
						{/each}
						<div>
							<label for="rate-input">Set product rate</label>
							<input id="rate-input" type="number" bind:value={commentRequest.rate} />
							<label for="content-input">Input comment:</label>
							<input id="content-input" type="text" bind:value={commentRequest.content} />
							<button
								class="btn btn-success"
								on:click={() => {
									PrivateMarketplaceApi.fromLocalStorage().registerComment(commentRequest);
								}}>Send comment</button
							>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<h1>{productId}</h1>
			<h1>Unloaded</h1>
		{/if}
	{/await}
</section>
