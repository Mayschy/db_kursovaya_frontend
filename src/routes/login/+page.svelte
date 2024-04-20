<script>
    import {goto} from "$app/navigation";
</script>

<section>
    <div class="login-container">
        <h2>Login</h2>
        <form>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" class="login-input"
                   required><br>

            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" class="login-input"
                   title="Password must be at least 8 characters long" required><br><br>

            <button type="submit" class="login-btn2" onclick="login()">Login</button>

        </form>
        <p style="font-size: 18; margin-top: 30px;">Don't have an account?
            <button class="register-btn" on:click={() => {goto("/register")}}>Register</button>
    </div>


</section>




