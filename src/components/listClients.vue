<template>
    <section class="container">
    <b-navbar type="light" variant="light">
        <b-nav-form>
            <b-form-input class="mr-sm-2" placeholder="Nombre..">

            </b-form-input>
            <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>
    </b-navbar>
    <b-table></b-table>
    </section>

    
</template>

<script>
export default {
    name: 'listClients',
    data(){
        return {
            getUsers: function(){
                
            }
        }
    }
}
</script>