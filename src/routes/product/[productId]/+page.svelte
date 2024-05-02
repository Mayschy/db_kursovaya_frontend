<script lang="ts">
	import { page } from '$app/stores';
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICommentDto,
		type IProductDto
	} from '@/api/marketplaceApi';
	const productId: string = $page.params.productId;

	let product: IProductDto;
	let comments: ICommentDto[] = [];

	let commentRequest = {
		productId: productId,
		content: '',
		rate: 0
	};
	async function loadData() {
		product = (await PrivateMarketplaceApi.getProduct(productId)).data as IProductDto;
		comments = (await PrivateMarketplaceApi.listComments(productId, 0, DEFAULT_PAGE_SIZE)).data
			.content as ICommentDto[];
	}

	loadData();
	let loadPromise = loadData();
</script>

<section>
	{#if product != undefined}
		<div class="product-container">
			<div class="product-image">
				{#each product.images as image}
					<img src={image} />
				{/each}
			</div>
			<div class="product-details">
				<h1 class="product-title">Title: {product.caption}</h1>
				<p class="product-description">Description: {product.description}</p>
				<p class="product-price">${product.actualPrice}</p>
				<p class="product-specs"><strong>Specifications:</strong></p>
				<div>
					{#each Object.entries(product.characteristics) as spec}
						<p>{spec[0]} : {spec[1]}</p>
					{/each}
				</div>
				<div class="comments">
					<strong>Comments:</strong>
					{#each comments as comment}
						<p>{comment.content}</p>
					{/each}
					<div>
						<label>Input comment:</label>
						<input type="text" bind:value={commentRequest.content} />
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
</section>
