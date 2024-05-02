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
	let comments: Array<ICommentDto>;

	async function onload() {
		try {
			const productResult = await PrivateMarketplaceApi.getProduct(productId);
			product = productResult.data as IProductDto;

			const commentsResult = await PrivateMarketplaceApi.listComments(
				productId,
				0,
				DEFAULT_PAGE_SIZE
			);
			comments = commentsResult.data as Array<ICommentDto>;
		} catch {}
	}

	onload();
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
				<h1 class="product-title">{product.caption}</h1>
				<p class="product-description">{product.description}</p>
				<p class="product-price">${product.actualPrice}</p>
				<p class="product-specs"><strong>Specifications:</strong></p>
				<div>
					{#each product.characteristics as spec}
						<p>{spec[0]} : {spec[1]}</p>
					{/each}
				</div>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<div class="comments">
					<strong>Comments:</strong>
					{#each comments as comment}
						<p>{comment.content}</p>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<h1>{productId}</h1>
		<h1>Unloaded</h1>
	{/if}
</section>
