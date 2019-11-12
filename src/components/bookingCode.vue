<template>
    <b-container>

        <div class="text-center mt-5 mb-5">
            <b-spinner
            variant="info"
            label="Spinning"
            v-if="!isLoad"
            >        
            </b-spinner>
        </div>
    <b-container class="d-flex justify-content-center mb-2">
    <b-button @click="previous" variant="info" class="mr-2">Anterior</b-button>
    <b-button @click="next" variant="info">Siguiente</b-button>

    </b-container>
    <table class="table table-bordered">
    <thead class="table-secondary">
        <tr>
        <th scope="col">Habitación</th>
        <th scope="col" v-for="(n,index) of 7" :key="index">{{addDays(index)}}</th>
        </tr>
    </thead>
    <tbody>

        <tr v-for="(row,index) of rowTable" :key="index">
            <th scope="row">{{row.room}}</th>
            <td v-for="(item,index2) of row.listRow" :key="index2" style="width: 14.23%" :colspan="item.colSpan" :class="{'table-primary rounded-sm': checkReservation(item.bookingCode)}"><div>
                <router-link to="/">
                <p v-show="item.bookingCode != 'Sin Reserva'">{{item.bookingCode}}({{item.firstName}})</p>
                </router-link>
                </div>
            </td>
        </tr>
    </tbody>
    </table>
    <b-container class="d-flex justify-content-center">
        <b-button variant="info" @click="previous" class="mr-2">Anterior</b-button>
        <b-button variant="info" @click="next">Siguiente</b-button>
    </b-container>
    </b-container>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { async } from 'q'

export default {
    name: 'bookingCode',
    data() {
        return {
            days: 0,
            rowTable: [],
            isLoad: false,
        }
    },
    methods: {
        addDays: function(day){
            let result = new Date();
            result.setDate(result.getDate() + day + this.days);
            let dd = String(result.getDate()).padStart(2, '0');
            let mm = String(result.getMonth() + 1).padStart(2, '0');
            let yy = String(result.getFullYear());
            return yy+'-'+mm+'-'+dd;
        },
        next: function(){
            this.isLoad = false;
            this.days = this.days + 7;
            this.rowTable = [];
            this.getListRow();
        },
        previous: function(){
            this.isLoad = false;
            this.days = this.days - 7;
            this.rowTable = [];
            this.getListRow()
        },
        getListRow: async function(){
            let object = {
                start: this.addDays(0),
                end: this.addDays(6)
            };
            let listRow = await Vue.axios.post('http://localhost:9000/booking/listByDateWithColSpan',object);
            listRow = listRow.data;
            this.rowTable = listRow;
            this.isLoad = true;
        },
        checkReservation: function(bookingCode){
            if(bookingCode !== "Sin Reserva"){
                return true;
            }else{
                return false;
            }
        }
    },
    created(){
        this.getListRow();
    }
}
</script>