<template>
    <b-container>
        <b-table 
        :items="period"
        :fields="fields"
        >
        </b-table>
    </b-container>
</template>
<script>

import axios from 'axios'

export default {
    name: 'infoReservation',
    props: ['code'],
    data (){
        return {
            period: [],
            fields: [
                {
                    label:'Codigo de Reserva',
                    key: 'periodReservation.bookingCode'
                },
                {
                    label:'Habitación',
                    key: 'periodRoom.code'
                },
                {
                    label:'Piso',
                    key: 'periodRoom.floor'
                },
                {
                    label:'Primer Nombre',
                    key: 'periodClient.firstName'
                },
                {
                    label:'Segundo Nombre',
                    key: 'periodClient.lastName'
                },
                {
                    label:'Rut',
                    key: 'periodClient.dniNumber'
                },
                {
                    label:'Fecha de inicio',
                    key: 'startDate'
                },
                {
                    label:'Fecha de fin',
                    key: 'endDate'
                }
            ]
        }
    },
    methods: {
        getPeriodByCode: async function(){
            let data = {
                "code":this.code
            }
            let res = await axios.post('http://35.232.225.161:8080/reserv_hotel/period/listPeriodByCode',data);
            if(res.status === 200){
                this.period = res.data
            }
        }
    },
    created() {
        this.getPeriodByCode()
    }
}
</script>