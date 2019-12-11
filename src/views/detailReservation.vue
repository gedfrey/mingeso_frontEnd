<template>
    <b-container>
        <h1>Detalle de reserva</h1>
        <infoReservation :code="$route.params.code"></infoReservation>
    </b-container>
</template>
<script>

import infoReservation from '@/components/infoReservation.vue'

export default {
    name:'viewDetailReservation',
    components: {
        infoReservation
    }
}
</script>