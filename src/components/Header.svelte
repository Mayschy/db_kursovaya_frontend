<script>
	import { isAuthenticated, logout } from '../api/marketplaceApi';
</script>

<header>
	<div class="cart">
		<a href="cart"><img src="/rep/busketicon.png" alt="Cart" /></a>
	</div>
	<div class="logo">
		<div class="iconLogo">
			<img width="60px" height="60px" src="/rep/12.png" alt="Market Icon" />
		</div>
		<a href="/">Stuck&Stock MARKET</a>
	</div>
	<div class="categories">
		<button class="dropdown-btn">Categories</button>
		<div class="dropdown-content"></div>
	</div>
	<div class="user">
		<a href="/login"><img src="/rep/usericon.png" alt="User" /></a>
		{#if isAuthenticated()}
			<p class="text-success">Authenticated</p>
			<button on:click={logout} class="btn btn-danger ">Logout</button>
		{/if}
	</div>
</header>
