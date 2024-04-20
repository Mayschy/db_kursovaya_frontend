<script>

    import Switch from "svelte-switch";

    let checkedValue = true;

    function handleChange(e) {
        const { checked } = e.detail;
        checkedValue = checked;
    }
</script>

<div class="container">
    <div class="cart-container">
        <h1>Your Cart</h1>
        <div class="orders-section">
            <h2>Your Orders</h2>
            <table class="orders-table">
                <thead>
                <tr>
                    <th>Fav. list</th>
                    <th>ID</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Shipping Address</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <h1>Simple usage</h1>
                        Switch with default style
                        <Switch on:change={handleChange} checked={checkedValue} />
                        <br />
                        The switch is {checkedValue ? 'on' : 'off'}.
                    </td>
                    <td>1</td>
                    <td><a href="product1.html">List of products 1</a></td>
                    <td>COMPLETED</td>
                    <td>123 Main Street, City, Country</td>
                    <td>2024-04-05</td>
                </tr>
                <tr>
                    <td>
                        <div class="toggle-switch"></div>
                    </td>
                    <td>3</td>
                    <td><a href="product3.html">List of products 3</a></td>
                    <td>COMPLETED</td>
                    <td>123 Main Street, City, Country</td>
                    <td>2024-04-05</td>
                </tr>
                <tr>
                    <td>
                        <div class="toggle-switch"></div>
                    </td>
                    <td>3</td>
                    <td><a href="product3.html">List of products 3</a></td>
                    <td>COMPLETED</td>
                    <td>123 Main Street, City, Country</td>
                    <td>2024-04-05</td>
                </tr>
                <tr>
                    <td>
                        <div class="toggle-switch"></div>
                    </td>
                    <td>3</td>
                    <td><a href="product3.html">List of products 3</a></td>
                    <td>COMPLETED</td>
                    <td>123 Main Street, City, Country</td>
                    <td>2024-04-05</td>
                </tr>
                <tr>
                    <td>
                        <div class="toggle-switch"></div>
                    </td>
                    <td>2</td>
                    <td><a href="product2.html">List of products 2</a></td>
                    <td>BLABLA</td>
                    <td>123 Main Street, City, Country</td>
                    <td>2024-05-05</td>
                </tr>
                <tr>
                    <td colspan="5">
                        <button class="pay-button" on:click={() => {alert("hello world")}}>Оплатить</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>