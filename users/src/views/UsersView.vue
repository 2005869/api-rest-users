<template>
    <div>
        <div>
            <h1 class="title is-1">Admin Panel</h1>
            <hr>
            
            

            <table class="table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Role</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td v-if="user.role == 0">User</td>
                            <td v-if="user.role == 1" class="notification is-link">Admin</td>
                            <td>
                                <button class="button is-primary is-responsive">Edit</button>&nbsp;
                                <button class="button is-danger is-responsive">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    setup() {
        
    },
    created(){

        const token = 'Bearer ' + localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const req = {
            headers: {
                Authorization: token,
                email
            }
         }   

        axios.get('http://localhost:8686/user', req).then(res => {
            this.users = res.data;
        }).catch(err => {
            console.log(err);
        });
    },
    data(){
        return {users: []}
    },
}
</script>

<style scoped>

</style>