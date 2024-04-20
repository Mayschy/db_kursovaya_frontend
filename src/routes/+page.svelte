<script>

    import NavItem from "../NavItem.svelte";

    let categories = [
        {
            name: "Laptops",
            subcategories: [
                {name: "Asus"},
                {name: "Xiaomu"}
            ]

        },
        {
            name: "Laptops",
            subcategories: [
                {name: "Asus"},
                {name: "Xiaomu"}
            ]

        }, {
            name: "Laptops",
            subcategories: [
                {name: "Asus"},
                {name: "Xiaomu"}
            ]

        }
    ]
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<section>
    <h1>Hello world</h1>
    <div class="sidebar">
        <h2 style="text-align: center; font-size: 36px; margin-top: 2vw;">Navigation</h2>
        <ul class="navigation">

            {#each categories as category}
                <NavItem data={category}/>
            {/each}
        </ul>
    </div>
</section>


