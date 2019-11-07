<template>
    <div>
        <b-container>
            <h1>List Clients</h1>
            <listClients/>
        </b-container>
    </div>
</template>

<script>

import listClients from '@/components/listClients.vue'

export default {
    name: 'ViewListClients',
    components:{
        listClients,
    }

}
</script>