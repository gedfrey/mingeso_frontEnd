<template>
    <div>
        <b-container>
            <h1>Crear Cliente</h1>
        </b-container>
        <createClient/>
    </div>
</template>

<script>

import createClient from '@/components/createClient.vue'

export default {
    name: 'viewCreateClient',
    components: {
        createClient,
    }
}
</script>