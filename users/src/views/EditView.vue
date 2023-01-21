<template>
    <div class="container">
        <h1 class="title is-1">Profile</h1>
        <hr>
        <div class="column is-half">
            <div v-if="error != undefined">
                <div class="notification is-danger">
                    <p>{{ error }}</p>
                </div>
            </div>
        </div>
        <p>ID:</p>
        <input type="text" name="userID" id="userID" placeholder="ID" class="input" v-model="id" disabled><br><br>
        <p>Name:</p>
        <input type="text" name="username" id="username" placeholder="username" class="input" v-model="name"><br><br>
        <p>E-mail:</p>
        <input type="email" name="email" id="email" placeholder="example@email.com" class="input" v-model="email"><br><br>
        <p>Role:</p>
        <input type="text" name="userRole" id="userRole" placeholder="Role" class="input" v-model="role"><br><br>
        <button class="button is-success" @click="updateUser()">Save</button>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    created(){

        const token = 'Bearer ' + localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const req = {
            headers: {
                Authorization: token,
                email
            }
         }   

        axios.get('http://localhost:8686/user/' + this.$route.params.id, req).then(res => {
            this.name = res.data[0].name;
            this.id = res.data[0].id;
            this.email = res.data[0].email;
            this.role = res.data[0].role;
            
        }).catch(err => {
            console.log(err);
            this.$router.push({name: 'UsersView'});
        });
    },
    data() {
        return {
            id: -1,
            name: '',
            email: '',
            role: 0,
            error: undefined
        }
    },
    methods: {
        updateUser(){

            const token = 'Bearer ' + localStorage.getItem('token');
            const email = localStorage.getItem('email');

            const req = {
                headers: {
                    Authorization: token,
                    email
                }
            }  

            axios.put('http://localhost:8686/user', {
                id: this.id,
                name: this.name,
                email: this.email,
                role: this.role
            }, req).then(res => {
                console.log(res);
                this.$router.push({name: 'UsersView'});
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