<script>
    export let data
</script>

<li>
    <a href="category1.html">{data.name}</a>
    <ul>
        {#each data.subcategories as subcategory}
            <li><a href="{subcategory.link}">{subcategory.name}</a></li>
        {/each}
    </ul>
</li>