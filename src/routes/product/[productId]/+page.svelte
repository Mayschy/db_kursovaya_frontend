<script lang="ts">
	import { page } from '$app/stores';
	import { PrivateMarketplaceApi, type IProductDto } from '../../../api/marketplaceApi';
	const productId: string = $page.params.productId;

	let product: IProductDto;

	const onload = async () => {
		const result = await PrivateMarketplaceApi.getProduct(productId);
		product = result.data as IProductDto;
	};

	$: onload();
</script>

<section>
	<h1>{productId}</h1>
	<h1>{product.caption}</h1>
</section>
