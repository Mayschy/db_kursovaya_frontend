<script lang="ts">
	import { PrivateMarketplaceApi } from '@/api/marketplaceApi';
	import Selector from '@/components/selector/Selector.svelte';
	import SelectorItem from '@/components/selector/SelectorItem.svelte';

	let privateApi = PrivateMarketplaceApi.fromLocalStorage();

	async function fetchDiscounts(query: string, page: number) {
		return (await PrivateMarketplaceApi.findDiscounts(query, page, 15)).data.content;
	}

	async function deleteDiscount(discount: any) {
		const response = await privateApi.deleteDiscount(discount.id);
		alert(`Deletion result: ${response.status}`);
	}
</script>

<section>
	<Selector fetchElements={fetchDiscounts} let:item>
		<h5 slot="header">Delete discounts</h5>
		<SelectorItem handler={deleteDiscount} {item} btnText="Delete">
			<p>{item.description} ({item.discount})</p>
		</SelectorItem>
	</Selector>
</section>
