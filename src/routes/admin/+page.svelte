<script lang="ts">
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICategoryDto
	} from '../../api/marketplaceApi';

	enum AdminActions {
		NONE,
		ADD_CATEGORY,
		ADD_PRODUCT,
		REMOVE_CATEGORY,
		REMOVE_PRODUCT
	}

	const availableActions = Object.keys(AdminActions).filter(
		(k) => typeof AdminActions[k as any] === 'number'
	);
	let action: AdminActions = AdminActions.ADD_CATEGORY;

	function changeAction(newValue: string) {
		action = AdminActions[newValue as keyof typeof AdminActions];
	}

	let categoryName:string;
	let fetchedCategories: ICategoryDto[];

	async function fetchCategories(name: string, page: number) {
		const result = await PrivateMarketplaceApi.findCategory(name, page, DEFAULT_PAGE_SIZE);
		fetchedCategories = result.data as ICategoryDto[];
	}

	let productRegister = {
		caption: '',
		categories: [''],
		characteristics: { '': '' },
		description: '',
		price: 0,
		images: ['']
	};
</script>

<section>
	<p>Select admin action to perform</p>
	<!-- <select
		on:change={(event) => {
			const newValue = event.target.value;
			changeAction(newValue);
			console.log(action);
		}}
	>
		{#each availableActions as action}
			<option value={action}>
				{action}
			</option>
		{/each}
	</select> -->
	{#if action == AdminActions.ADD_CATEGORY}
		<div class="d-flex justify-content-center align-items-center">
			<div class="col-7 col-md-7 col-lg-7 col-xl-5">
				<div class="card rounded-5 shadow-lg">
					<div class="card-body p-5 body_colored2 rounded-5">
						<h2>Добавить Товар</h2>
						<div class="mb-3">
							<label for="productName" class="form-label">Product Name</label>
							<input type="text" class="form-control" id="productName" required />
						</div>
						<div class="mb-3">
							<label for="productPrice" class="form-label">Product Price</label>
							<input type="number" class="form-control" id="productPrice" required />
						</div>
						<div class="mb-3">
							<label for="productDescription" class="form-label">Description</label>
							<textarea class="form-control" id="productDescription" rows="3" required></textarea>
						</div>
						<div class="mb-3">
							<label for="productImage" class="form-label">Product Image</label>
							<input type="file" class="form-control" id="productImage" accept="image/*" required />
						</div>

						<div>
							<p>Select categories</p>
							<label for="search_field">Category name</label>
							<input type="text" value={categoryName} id="search_field" />
							<button
								on:click={() => {
									fetchCategories(categoryName, 0);
								}}>Search</button
							>

							<div>
								{#each fetchedCategories as category}
									{#if productRegister.categories.includes(category.name)}
										<button
											on:click={() => {
												productRegister.categories.push(category.name);
											}}>Add {category.name}</button
										>
									{:else}
										<button
											on:click={() => {
												const index = productRegister.categories.indexOf(category.name);
												productRegister.categories.splice(index);
											}}>Remove {category.name}</button
										>
									{/if}
								{/each}
							</div>
						</div>

						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>
