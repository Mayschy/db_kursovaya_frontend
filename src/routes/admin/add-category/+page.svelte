<script lang="ts">
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICategoryDto,
		type ICategoryRegisterDto,
		type IProductRegisterDto
	} from '@/api/marketplaceApi';
	import DefaultCard from '@/components/DefaultCard.svelte';

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
</script>

<section>
	<DefaultCard>
		<h2>Добавить Категорию</h2>
		<div class="mb-3">
			<label for="categoryName" class="form-label">Category Name</label>
			<input type="text" class="form-control" id="categoryName" required />
		</div>
	</DefaultCard>
</section>
