<script lang="ts">
	import { page } from '$app/stores';
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICommentDto,
		type IProductDto
	} from '../../../api/marketplaceApi';
	const productId: string = $page.params.productId;

	let product: IProductDto;
	let comments: Array<ICommentDto>;

	const onload = async () => {
		const productResult = await PrivateMarketplaceApi.getProduct(productId);
		product = productResult.data as IProductDto;

		const commentsResult = await PrivateMarketplaceApi.listComments(
			productId,
			0,
			DEFAULT_PAGE_SIZE
		);
		comments = commentsResult.data as Array<ICommentDto>;
	};

	$: onload();
</script>

<section>
	{#if product != undefined}
		<div class="product-container">
			<div class="product-image">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={product.images[0]} />
			</div>
			<div class="product-details">
				<h1 class="product-title">{product.caption}</h1>
				<p class="product-description">{product.description}</p>
				<p class="product-price">{product.price}</p>
				<p class="product-specs"><strong>Specifications:</strong></p>
				<div>
					{#each product.characteristics as spec}
						<p>{spec[0]}: {spec[1]}</p>
					{/each}
				</div>

				<div>
					<h5>Comments</h5>
					<div>
						{#each comments as comment}
							<p>{comment.content}</p>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<h1>{productId}</h1>
		<h1>Unloaded</h1>
	{/if}
</section>
