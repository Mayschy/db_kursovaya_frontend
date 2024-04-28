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
	import SelectorItem from '@/components/selector/SelectorItem.svelte';

	const privateApi = PrivateMarketplaceApi.fromLocalStorage();

	let categoryRegister: ICategoryRegisterDto = {
		name: '',
		parentCategory: '',
		subcategories: [],
		requiredProps: []
	};

	let selectedCategories: any[] = [];

	async function fetchCategories2(query: string, page: number) {
		// const result = await PrivateMarketplaceApi.findCategory(query, page, DEFAULT_PAGE_SIZE)
		// return result.data as any[]

		return [
			{
				name: 'first category'
			},
			{
				name: 'second'
			},
			{
				name: 'thired'
			}
		];
	}

	function onClickCategory(category: any, add: boolean) {
		console.log(category);

		if (add) selectedCategories.push(category);
		else selectedCategories.splice(selectedCategories.indexOf(category), 1);

		selectedCategories = selectedCategories;
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
				<p slot="header">Select category</p>
				<AddRemoveItem
					handler={onClickCategory}
					conatains={(item) => selectedCategories.includes(item)}
					{item}
				>
					<p>{item.name}</p>
				</AddRemoveItem>
			</Selector>
		</div>
	</DefaultCard>
</section>
