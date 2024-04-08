<script>
	import { PublicMarketplaceApi } from "./marketplaceApi";

	let username;
	let firstname;
	let lastname;
	let mailCode;
	let role;
	let passowrd;
	let adminSecret;
	let email;

	function sendEmailCode() {
		PublicMarketplaceApi.sendEmailCode(email)
	}

	function register() {
		PublicMarketplaceApi.register(
			username,
			firstname,
			lastname,
			passowrd,
			role,
			mailCode,
			adminSecret,
		)
			.then((it) => console.log(it.message))
			.then((it) => it.json())
			.then((it) => console.log(it));
	}
</script>

<main>
	<p>Email</p>
	<input type="email" bind:value={email} />
	<button on:click={sendEmailCode}>Send email code</button>

	<p>Username</p>
	<input type="text" bind:value={username} />

	<p>Firstname</p>
	<input type="text" bind:value={firstname} />

	<p>Lastname</p>
	<input type="text" bind:value={lastname} />

	<p>Password</p>
	<input type="text" bind:value={passowrd} />

	<p>Email Code</p>
	<input type="text" bind:value={mailCode} />

	<p>Role</p>
	<input type="text" bind:value={role} />

	<p>Admin Secret</p>
	<input type="text" bind:value={adminSecret} />

	<button on:click={register}>Register</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
