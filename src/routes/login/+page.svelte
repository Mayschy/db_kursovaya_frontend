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


    <div class="registration-popup">
        <div class="close-btn">&#10006;</div>
        <form action="register.php" method="post"><h2>Register Now</h2>
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" required>

            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" class="login-input"
                   required><br>

            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" class="login-input"
                   title="Password must be at least 8 characters long" required><br><br>

            <label for="Checkmail-code">Check-mail code:</label>
            <input type="text" id="Checkmail-code" name="Checkmail-code" required>

            <label for="Admin-secret">Admin-secret:</label>
            <input type="text" id="Admin-secret" name="Admin-secret" placeholder="0000" required>

            <label for="address">Registration Address:</label>
            <textarea id="address" name="address" rows="3" required></textarea>

            <button class="submit-btn" type="submit">Register</button>
            <button class="check-mail-code-btn">Check Mail-Code</button>

        </form>
    </div>
</section>




