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
                                <button class="button is-primary is-responsive" @click="editUser(user.id)">Edit</button>&nbsp;
                                <button class="button is-danger is-responsive" @click="showModal(user.id)">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div :class="{modal: true, 'is-active': statusModal}">
                    <div class="modal-background">
                        
                    </div>
                    <div class="modal-content">
                        <!-- Any other Bulma elements you want -->
                        <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                            Confirm your action
                            </p>
                            <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                Do you really want remove this user?
                            <br>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item" @click="hideModal()">Cancel</a>
                            <a href="#" class="card-footer-item" @click="deleteUser()">Delete</a>
                        </footer>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
                </div>
        
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
        return {users: [],
            statusModal: false,
            deleteUserId: -1,
        }
    },
    methods: {
        hideModal(){
            this.statusModal = false;
        },
        showModal(id){
            this.statusModal = true;
            this.deleteUserId = id;
        },
        deleteUser(){

            const token = 'Bearer ' + localStorage.getItem('token');
            const email = localStorage.getItem('email');

            const req = {
                headers: {
                    Authorization: token,
                    email
                }
            }   

            axios.delete('http://localhost:8686/user/' + this.deleteUserId, req).then(res => {
                console.log(res);
                this.statusModal = false;
                this.users = this.users.filter(u => u.id != this.deleteUserId);
            }).catch(err => {
                console.log(err);
            });
        },
        editUser(id){
            this.$router.push({path: '/admin/users/edit/' + id});
        }
    }
}
</script>

<style scoped>

</style>