<script>
    import {PublicMarketplaceApi} from "../../api/marketplaceApi.js";
</script>

<section>
    <div class="registration-popup open">
        <div class="close-btn">✖</div>
        <form on:submit={() => {PublicMarketplaceApi.register()}} method="post"><h2>Register Now</h2>
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" required="">

            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" class="login-input"
                   required=""><br>

            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required="">

            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" class="login-input"
                   title="Password must be at least 8 characters long" required=""><br><br>

            <label for="Checkmail-code">Check-mail code:</label>
            <input type="text" id="Checkmail-code" name="Checkmail-code" required="">

            <label for="Admin-secret">Admin-secret:</label>
            <input type="text" id="Admin-secret" name="Admin-secret" placeholder="0000" required="">

            <label for="address">Registration Address:</label>
            <textarea id="address" name="address" rows="3" required=""></textarea>

            <button class="submit-btn" type="submit">Register</button>
            <button class="check-mail-code-btn">Check Mail-Code</button>
        </form>
    </div>
</section>