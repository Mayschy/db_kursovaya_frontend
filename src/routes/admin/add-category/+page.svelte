<script lang="ts">
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICategoryDto,
		type ICategoryRegisterDto,
		type IProductRegisterDto
	} from '@/api/marketplaceApi';
	import DefaultCard from '@/components/DefaultCard.svelte';
	import Selector from '@/components/Selector.svelte';
	import SelectorItem from '@/components/SelectorItem.svelte';

	const privateApi = PrivateMarketplaceApi.fromLocalStorage();

	let categoryRegister: ICategoryRegisterDto = {
		name: '',
		parentCategory: '',
		subcategories: [],
		requiredProps: []
	};

	let fetchedCategories: ICategoryDto[];

	async function fetchCategories(name: string, page: number) {
		const result = await PrivateMarketplaceApi.findCategory(name, page, DEFAULT_PAGE_SIZE);
		fetchedCategories = result.data as ICategoryDto[];
		console.log(result);
	}

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

	function onClickCategory(category: any) {
		console.log(category);
	}

	let el: any;
</script>

<section>
	<DefaultCard>
		<h2>Добавить Категорию</h2>
		<div class="mb-3">
			<label for="categoryName" class="form-label">Category Name</label>
			<input type="text" class="form-control" id="categoryName" required />
		</div>
		<div>
			<Selector fetchElements={fetchCategories2} handler={onClickCategory}>
				<p let:item>{item}</p>
			</Selector>
		</div>
	</DefaultCard>
</section>
