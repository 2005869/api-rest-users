<template>
    <div>
        <h1>Register user</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <p>Name:</p>
                <input type="text" name="username" id="username" placeholder="username" class="input" v-model="name"><br><br>
                <p>E-mail:</p>
                <input type="email" name="email" id="email" placeholder="example@email.com" class="input" v-model="email"><br><br>
                <p>Password:</p>
                <input type="password" name="password" id="password" placeholder="********" class="input" v-model="password"><br><br>
                <button class="button is-success" @click="register">Register</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register(){
            console.log(this.name);
            console.log(this.email);
            console.log(this.password);
        }
    }
    
}
</script>

<style scoped>

</style>