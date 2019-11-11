<template>
    <div>
        <b-container>
            <h1>Crear Reservación</h1>
        </b-container>
        <createReservation/>
    </div>
</template>

<script>

import createReservation from '@/components/createReservation';

export default {
    name:'ViewCreateReservation',
    components: {
        createReservation
    }
}
</script>