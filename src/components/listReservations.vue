<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>Lista de Reservaciones</h1>
            </b-col>
    </b-row>
    <b-row>
        <b-form  @submit.stop.prevent="getPeriods"
        class="d-flex flex-column justify-content-center">
        <b-form-group
        id="form-select-date"
        label="Seleciona la fecha de la reserva a buscar"
        description="Debes selecionar un rango de fecha valido"
        >
        <b-row class="d-flex align-items-center">
            <b-col cols="12" md="4" class="my-2">
                <date-picker v-model="objectDate.start" placeholder="Fecha de inicio" :config="options" required></date-picker>
            </b-col>
            <b-col cols="12" md="4" class="my-2">
                <date-picker v-model="objectDate.end" placeholder="Fecha de fin" :config="options" required></date-picker>
            </b-col>
            <b-button variant="primary" type="submit">Buscar</b-button>
        </b-row>
        </b-form-group>
        </b-form>
        <b-form @submit.stop.prevent="findName">
        <b-form-group
        id="form-findByName"
        label="Buscar por nombre"
        >
        <b-row>
            <b-col cols="12" md="7" class="my-2">
                <b-form-input
                id="input-search"
                v-model="name"
                placeholder="Ingresa el nombre..."
                required
                >
                </b-form-input>

            </b-col>
            <b-button type="submit" cols="12" md="6" class="my-2" variant="primary">Buscar</b-button>    
            </b-row>
        </b-form-group>
        </b-form>       
    </b-row>
    <b-row>
        <b-col>
            <b-table
            :items="listReservations"
            :fields="fields"
            >

            </b-table>
        </b-col>
    </b-row>       
    </b-container>
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
    name: 'listReservation',
    data() {
        return {
            options: {
                format: 'YYYY-MM-DD',
                useCurrent:false,
            },
            objectDate: {
                start: '',
                end: ''
            },
            users: [],
            usersBackUp: [],
            listReservations: [],
            name: '',
            fields: [
                {
                    label: 'Habitación',
                    key: 'periodRoom.code',

                },
                {
                    label: 'Codigo de Reservación',
                    key: 'periodReservation.bookingCode'
                },
                {
                    label: 'Nombre del cliente',
                    key: 'periodClient.firstName'
                },
                {
                    label: 'Apellido del cliente',
                    key: 'periodClient.lastName'
                },
                {
                    label: 'DNI',
                    key: 'periodClient.dniNumber'
                },
                {
                    label: 'Fecha de inicio',
                    key: 'startDate'
                },
                {
                    label: 'Fecha de fin',
                    key: 'endDate'
                }
            ]

        }
    },
    components: {
        datePicker
    },
    methods: {
        getPeriods: async function(){
            let list = await Vue.axios.post('http://localhost:9000/period/listPeriodByDate',this.objectDate);
            this.listReservations = list.data;
        },
        getUsers: async function(){
            let list = await Vue.axios.get('http://localhost:9000/clients');
            this.users = list.data;
            this.usersBackUp = list.data;
        },
        findName: function(){
            let newList = []
            for(let user of this.usersBackUp){
                let positionFirst = item.firstName.indexOf(this.name);
                let positionLast = item.lastName.indexOf(this.name);
                let positionDni = item.dniNumber.indexOf(this.name);
                if(positionFirst !== -1 || positionLast !== -1 || positionDni !== -1){
                    
                }
            }
        }

    }
}
</script>