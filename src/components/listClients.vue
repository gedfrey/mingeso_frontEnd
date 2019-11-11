<template>
    <section class="container">
    <b-navbar type="light" variant="light">
        <b-nav-form>
            <b-form-input class="mr-sm-2" placeholder="Nombre.." v-model="findName">

            </b-form-input>
            <b-button variant="outline-primary" class="my-2 my-sm-0"  @click="search">Buscar</b-button>
        </b-nav-form>
    </b-navbar>
    <b-table striped hover :items="users" :fields="fields" class="mt-2">

    </b-table>
    </section>

    
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { async } from 'q'


export default {
    name: 'listClients',
    data(){
        return {
            findName: '',
            users: [], // imprimir en pantalla
            usersBackUp: [], // todo los nombres
            fields: [
                {
                    key:'dniNumber',
                    label:'DNI',
                    sortable:true,
                },
                {
                    key:'firstName',
                    label:'Nombre',
                    sortable:true,
                }
                ,
                {
                    key:'lastName',
                    label:'Apellido',
                    sortable:true,
                },
                {
                    key:'email',
                    label:'Email',
                    sortable:true,
                }],
        }
    },
    methods: {
        getUsers: async function(){
            let list = await Vue.axios.get('http://localhost:9000/clients');
            this.users = list.data;
            this.usersBackUp = list.data;
        },
        search: function(){
            let newList = []
            for(let item of this.usersBackUp){
                let positionFirst = item.firstName.indexOf(this.findName);
                let positionLast = item.lastName.indexOf(this.findName);
                if(positionFirst !== -1 || positionLast !== -1){
                    newList.push(item);
                }
            }
            this.user = [];
            this.users = newList;
            this.findName = '';
        }
    },
    created() {
        this.getUsers();
    }
}
</script>