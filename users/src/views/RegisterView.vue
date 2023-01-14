<template>
    <div>
        <h1>Register user</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <p>Name:</p>
                <input type="text" name="username" id="username" placeholder="username" class="input"><br><br>
                <p>E-mail:</p>
                <input type="email" name="email" id="email" placeholder="example@email.com" class="input"><br><br>
                <p>Password:</p>
                <input type="password" name="password" id="password" placeholder="********" class="input"><br><br>
                <button class="button is-success">Register</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>

</style>