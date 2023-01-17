<template>
    <div>
        <h1>Register user</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        <p>{{ error }}</p>
                    </div>
                </div>
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
import axios from 'axios';


export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: undefined
        }
    },
    methods: {
        register(){
            axios.post('http://localhost:8686/user', {
                name: this.name,
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
            }).catch(err => {
                var msgError = err.response.data.err;
                this.error = msgError;
            });
        }
    }
    
}
</script>

<style scoped>

</style>