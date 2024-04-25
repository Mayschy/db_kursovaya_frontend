<script>
	import { goto } from '$app/navigation';

	import { PrivateMarketplaceApi } from '../../api/marketplaceApi';

	let loginRequest = {
		username: '',
		password: ''
	};

	async function login() {
		const privateApi = new PrivateMarketplaceApi(loginRequest.username, loginRequest.password);

		const me = await privateApi.getMe();
		if (is_successful(me.status)) PrivateMarketplaceApi.instance = privateApi;

		console.log(me.data);
	}
</script>

<section>
	<div class="login-container">
		<h2>Login</h2>
		<div>
			<label for="username">Username:</label><br />
			<input
				bind:value={loginRequest.username}
				type="text"
				id="username"
				class="login-input"
				required
			/><br />

			<label for="password">Password:</label><br />
			<input
				bind:value={loginRequest.password}
				type="password"
				id="password"
				name="password"
				class="login-input"
				title="Password must be at least 8 characters long"
				required
			/><br>
			<button class="login-btn2" on:click={login}>Login</button>
		</div>

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
