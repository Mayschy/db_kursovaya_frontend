<script lang="ts">
	import type { ICategoryDto } from "@/api/marketplaceApi";

    export let data: ICategoryDto
</script>
 

<li class="nav-item">
    <a class="nav-link" href="/categories/{data.name}">{data.name}</a>
    <ul>
        {#each data.subcategories as subcategory}
            <li><a href="/categories/{data.name}">{subcategory}</a></li>
        {/each}
    </ul>
</li>