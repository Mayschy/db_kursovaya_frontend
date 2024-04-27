<script lang="ts">
	import {
		DEFAULT_PAGE_SIZE,
		PrivateMarketplaceApi,
		type ICategoryDto,
		type IProductRegisterDto
	} from '../../api/marketplaceApi';
	import DefaultCard from '../../components/DefaultCard.svelte';

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

	let categoryName: string = '';
	let newProp: string = '';
	let newImage: string = '';
	let fetchedCategories: ICategoryDto[] = [];

	function addRequiredProps(category: ICategoryDto) {
		category.requiredProps.forEach((prop) => {
			if (!productRegister.characteristics.has(prop)) productRegister.characteristics.set(prop, '');
			productRegister = productRegister;
		});
	}

	async function fetchCategories(name: string, page: number) {
		// fetchedCategories = [
		// 	{
		// 		name: 'First category',
		// 		parentCategory: undefined,
		// 		subcategories: [],
		// 		requiredProps: ['length', 'weight']
		// 	},
		// 	{
		// 		name: 'First',
		// 		parentCategory: undefined,
		// 		subcategories: [],
		// 		requiredProps: ['length', 'weight']
		// 	},
		// 	{
		// 		name: 'Fir',
		// 		parentCategory: undefined,
		// 		subcategories: [],
		// 		requiredProps: ['length', 'weight']
		// 	}
		// ];
		const result = await PrivateMarketplaceApi.findCategory(name, page, DEFAULT_PAGE_SIZE);
		fetchedCategories = result.data as ICategoryDto[];
	}

	let productRegister: IProductRegisterDto = {
		caption: '',
		categories: [],
		characteristics: new Map<string, string>(),
		description: '',
		price: 0,
		images: []
	};
</script>

<section>
	<DefaultCard class="pb-3">
		<p>Select admin action to perform</p>
		<select
			on:change={(event) => {
				const newValue = event.currentTarget.value;
				changeAction(newValue);
				console.log(action);
			}}
		>
			{#each availableActions as action}
				<option value={action}>
					{action}
				</option>
			{/each}
		</select>
	</DefaultCard>
	{#if action == AdminActions.ADD_CATEGORY}
		<DefaultCard>
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

			<div class="container-lg border border-5 p-3 rounded-4 shadow mb-3">
				<p>Select categories</p>
				<div class="row">
					<label for="search_field">Category name</label>
					<div class="col">
						<input class="form-control" type="text" value={categoryName} id="search_field" />
					</div>
					<div class="col">
						<button
							class="btn btn-primary"
							on:click={() => {
								fetchCategories(categoryName, 0);
							}}>Search</button
						>
					</div>
				</div>

				<div class="list-group">
					{#each fetchedCategories as category}
						{#if productRegister.categories.includes(category.name)}
							<button
								class="btn btn-danger list-group-item"
								on:click={() => {
									const index = productRegister.categories.indexOf(category.name);
									productRegister.categories.splice(index);
									productRegister = productRegister;
								}}>Remove {category.name}</button
							>
						{:else}
							<button
								class="btn btn-success list-group-item"
								on:click={() => {
									productRegister.categories.push(category.name);
									productRegister = productRegister;

									addRequiredProps(category);
								}}>Add {category.name}</button
							>
						{/if}
					{/each}
				</div>
			</div>
			{#if productRegister.characteristics.size != 0}
				<div class="container-lg border border-5 p-3 rounded-4 shadow mb-3">
					<p>Edit product specs</p>

					<div class="list-group">
						{#each productRegister.characteristics as prop}
							<div class="list-group-item">
								<p>{prop[0]}</p>
								<input
									type="text"
									on:change={(event) => {
										productRegister.characteristics.set(prop[0], event.currentTarget.value);
									}}
								/>
								<button
									on:click={() => {
										productRegister.characteristics.delete(prop[0]);
										productRegister = productRegister;
									}}>X</button
								>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			<div class="container-lg border border-5 p-3 rounded-4 shadow mb-3">
				<p>Add prop</p>
				<div class="row">
					<div class="col">
						<input class="form-control" type="text" bind:value={newProp} />
					</div>
					<div class="col">
						<button
							class="btn btn-primary"
							on:click={() => {
								productRegister.characteristics.set(newProp, '');
								productRegister = productRegister;
							}}>Add</button
						>
					</div>
				</div>
			</div>

			<div class="container-lg border border-5 p-3 rounded-4 shadow mb-3">
				<p>Add image</p>
				<div class="row">
					<div class="col">
						<input class="form-control" type="text" bind:value={newImage} />
					</div>
					<div class="col">
						<button
							class="btn btn-primary"
							on:click={() => {
								if (!productRegister.images.includes(newImage)) {
									productRegister.images.push(newImage);
									productRegister = productRegister;
								}
							}}>Add</button
						>
					</div>
				</div>
				<div class="list-group">
					{#each productRegister.images as image}
						<div class="list-group-item">
							<div class="row">
								<div class="col">
									<p>{image}</p>
								</div>
								<div class="col">
									<button
										on:click={() => {
											const index = productRegister.images.indexOf(image);
											productRegister.images.splice(index);
											productRegister = productRegister;
										}}>X</button
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<button
				on:click={() => {
					console.log(productRegister);
				}}
				class="btn btn-primary">Submit</button
			>
		</DefaultCard>
	{/if}
</section>
