<script lang="ts">
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICategoryDto,
		type ICategoryRegisterDto,
		type IProductRegisterDto
	} from '@/api/marketplaceApi';
	import DefaultCard from '@/components/DefaultCard.svelte';
	import AddRemoveItem from '@/components/selector/AddRemoveItem.svelte';
	import Selector from '@/components/selector/Selector.svelte';
	import ElementsList from '@/components/list/ElementsList.svelte';
	import ListButton from '@/components/list/ListButton.svelte';
	const privateApi = PrivateMarketplaceApi.fromLocalStorage();

	let parentCategories: any[] = [];

	async function fetchCategories2(query: string, page: number) {
		// const result = await PrivateMarketplaceApi.findCategory(query, page, DEFAULT_PAGE_SIZE);
		// return result.data as any[];

		return [
			{
				name: 'hello world'
			},
			{
				name: 'hello world 2'
			},
			{
				name: 'hello world 3'
			}
		];
	}

	function onClickCategory(category: any, add: boolean) {
		if (add) parentCategories.push(category);
		else parentCategories.splice(parentCategories.indexOf(category), 1);

		parentCategories = parentCategories;
	}
</script>

<section>
	<DefaultCard>
		<h2>Добавить Категорию</h2>
		<div class="mb-3">
			<label for="categoryName" class="form-label">Category Name</label>
			<input type="text" class="form-control" id="categoryName" required />
		</div>
		<div>
			<Selector fetchElements={fetchCategories2} let:item>
				<p slot="header">Select parent categories</p>
				<AddRemoveItem
					handler={onClickCategory}
					conatains={(item) => parentCategories.includes(item)}
					{item}
				>
					<p>{item.name}</p>
				</AddRemoveItem>
			</Selector>
			<ElementsList elements={parentCategories} let:item>
				<ListButton
					{item}
					btnText="remove"
					handler={() => {
						parentCategories.splice(parentCategories.indexOf(item), 1);
						parentCategories = parentCategories;
					}}
				/>
			</ElementsList>
		</div>
	</DefaultCard>
</section>
