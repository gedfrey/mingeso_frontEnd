<template> 
    <div class="container">
        <b-form v-if="display == 0" @submit.stop.prevent="getRooms"
        class="d-flex flex-column justify-content-center">
            <b-form-group
            id="form-select-date"
            label="Seleciona la fecha de la reserva"
            description="Debes selecionar la fecha de la reserva"
            >
            <b-row>
                <b-col cols="12" md="4" class="my-2">
                    <date-picker v-model="objectDate.start" placeholder="Fecha de inicio" :config="options" required></date-picker>
                </b-col>
                <b-col cols="12" md="4" class="my-2">
                    <date-picker v-model="objectDate.end" placeholder="Fecha de fin" :config="options" required></date-picker>
                </b-col>
            </b-row>
            </b-form-group>
            <div>
                <b-button variant="primary" type="submit">Siguiente</b-button>
            </div>
        </b-form>
        <b-form v-if="display == 1" @submit.stop.prevent="next">
            <b-table
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            selected-variant="primary"
            :items="listRoomAvaible"
            :fields="fields"
            @row-selected="onRowSelected"
            responsive="sm"
            >
            <template v-slot:cell(rooms)="{ rowSelected }">
                <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>
            </b-table>
            <b-row class="mt-4 d-flex justify-content-center">
                <b-button cols="12" md="4"  variant="primary" class="m-2" @click="previous">Anterior</b-button>
                <b-button cols="12" md="4" variant="primary" class="m-2" type="submit">Siguiente</b-button>
            </b-row>    
        </b-form>
        <b-form v-if="display == 2" @submit.stop.prevent="create" >
            <b-form-group
            id="form-select-user"
            label="Seleciona el usuario que registra la reserva"
            description="Debes selecionar el usuario que realiza la reserva"
            >
            <b-form-select
            id="input-select-user"
            v-model="user"
            :options="users"
            required
            >
            </b-form-select>
            </b-form-group>
            <b-row class="d-flex justify-content-center">
                <b-col cols=12 md="1">
                    <b-button variant="primary" @click="previous">Anterior</b-button>
                </b-col>
                <b-col cols=12 md="1">
                    <b-button variant="primary" type="submit">Enviar</b-button>
                </b-col>
            </b-row>
            <b-alert v-model="error.create" variant="danger" dismissible>Error al registrar la Reserva</b-alert>
            <b-alert v-for="(error,index) of errorList" :key="index" v-model="error.create" variant="danger" dismissible>error</b-alert>
        </b-form>
        <b-container v-if="display == 3">
            <b-alert v-model="success.create" variant="success" dismissible>Reservación Registrada</b-alert>
            <b-button @click="onReset" variant="danger">Reiniciar</b-button>
        </b-container>

    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { async } from 'q'

import 'bootstrap/dist/css/bootstrap.css';
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';



export default {

    

    name:'createReservation',
    data() {
        return {
            listRoomAvaible: [],
            rooms: [],
            objectDate: {
                start: '',
                end: new Date()
            },
            user: null,
            users: [],
            display: 0,
            options: {
                format: 'YYYY-MM-DD',
                useCurrent:false,
            },
            fields: [
                {
                    name: 'Habitación',
                    key: 'code',
                    sortable:true
                },
                {
                    name: 'Piso',
                    key: 'floor',
                    sortable:true
                },
                {
                    name: 'Tipo de Habitación',
                    key: 'roomType.name',
                    sortable:true
                }],
            selectMode: 'multi',
            error: {
                create: null,

            },
            success: {
                create: null,
            },
            errorList: []

        }
    },
    components: {
        datePicker
    },
    methods: {
        currentDate: function(){
            let today = new Date();
            let dd = String(today.getDate());
            let mm = String(today.getMonth()+1);
            let yyyy = String(today.getFullYear());
            this.objectDate.start = yyyy+'-'+mm+'-'+dd;
            this.objectDate.end = yyyy+'-'+mm+'-'+dd;
        },
        onRowSelected(listRoomAvaible) {
            this.rooms = listRoomAvaible
        },
        getRoomsAvaible: async function(){
            this.listRoomAvaible = [];
            let list = await Vue.axios.post('http://35.232.225.161:8080/reserv_hotel/room/listRoomAvByDate',this.objectDate);
            this.listRoomAvaible = list.data;
        },
        getRooms: function(){
            this.getRoomsAvaible();
            this.display++;
        },
        onReset: function(){
            this.listRoomAvaible = [];
            this.rooms = [];
            this.objectDate.start = '';
            this.objectDate.end = '';
            this.user = null;
            this.display = 0;
            this.error.create = null;
            this.errorList = [];
            this.success.create = null;
        },
        getUsers: async function(){
            let users = await Vue.axios.get('http://35.232.225.161:8080/reserv_hotel/clients');
            this.users.push({text: 'Selecciona un usuario', value:null});
            for(let user of users.data){
                this.users.push({
                    text:user.firstName+' '+user.lastName,
                    value:user.dniNumber
                });
            }
        },
        next: function(evt){
            evt.preventDefault();
            this.display++;
        },
        previous: function(){
            this.display--;
        },
        create: async function(){
            
            if(this.user !== null){

                let codeReservation = await Vue.axios.get('http://35.232.225.161:8080/reserv_hotel/new_reservation');
                let errorList = []
                
                for(let room of this.rooms){
                    
                    let objectSend = {
                        type:"none",
                        start:this.objectDate.start,
                        end:this.objectDate.end,
                        room:room.code,
                        code:codeReservation.data.bookingCode,
                        dni:this.user
                    };
    
                    let res = await Vue.axios.post('http://35.232.225.161:8080/reserv_hotel/period/add',objectSend);
                    if(res.status !== 202){
                        errorList.push(res);
                    }
    
                };

                if(errorList.length === 0){
                    this.success.create = true;
                    this.display++;                    
                }else{
                    this.error.create = true;
                    this.errorList = errorList;                

                }


            }else{
                this.error.create = true;
            }
            
        }

    },
    created(){
        this.getUsers();
        this.currentDate();
    }
}
</script>