<template>
    <div>
        <h1 class="title is-1">Login</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        <p>{{ error }}</p>
                    </div>
                </div>
                <p>E-mail:</p>
                <input type="email" name="email" id="email" placeholder="example@email.com" class="input" v-model="email"><br><br>
                <p>Password:</p>
                <input type="password" name="password" id="password" placeholder="********" class="input" v-model="password"><br><br>
                <button class="button is-success" @click="login">Login</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            email: '',
            password: '',
            error: undefined
        }
    },
    methods: {
        login(){
            axios.post('http://localhost:8686/login', {
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                this.$router.push({name: 'Success'});
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