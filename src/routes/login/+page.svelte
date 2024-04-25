<script>
	import { goto } from '$app/navigation';

	import { PrivateMarketplaceApi } from '../../api/marketplaceApi';

	let loginRequest = {
		username: '',
		password: ''
	};

	function login() {
		PrivateMarketplaceApi.instance = new PrivateMarketplaceApi(
			loginRequest.username,
			loginRequest.password
		);

		
	}
</script>

<section>
	<div class="login-container">
		<h2>Login</h2>
		<form>
			<label for="username">Username:</label><br />
			<input type="text" id="username" class="login-input" required /><br />

			<label for="password">Password:</label><br />
			<input
				type="password"
				id="password"
				name="password"
				class="login-input"
				title="Password must be at least 8 characters long"
				required
			/>
			<button class="login-btn2" on:click={login}>Login</button>
		</form>
		<p style="font-size: 18; margin-top: 30px;">
			Don't have an account?
			<button
				class="register-btn"
				on:click={() => {
					goto('/register');
				}}>Register</button
			>
		</p>
	</div>
</section>
