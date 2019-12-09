<template>
    <div>
        <b-container >
            <b-form @submit="create" @reset="onReset" novalidated>
                
                <b-input
                    id="input-firstName"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="formData.first_name"
                    placeholder="Nombre"
                    :state="error.firstName"
                    required
                    >
                
                </b-input> 
                <b-form-invalid-feedback :state="error.firstName">
                    Debes agregar un nombre entre 4 a 20 caracteres
                </b-form-invalid-feedback>
                <b-input
                    id="input-lastName"
                    class="mt-2 mb-2 mr-sm-2 mb-sm-0 "
                    v-model="formData.last_name"
                    placeholder="Apellido"
                    :state="error.lastName"
                    required
                    >
        
                </b-input>
                <b-form-invalid-feedback :state="error.lastName">
                    Debes agregar un apellido entre 4 a 20 caracteres
                </b-form-invalid-feedback>
                <b-input
                    id="input-dni"
                    class="mt-2 mb-2 mr-sm-2 mb-sm-0"
                    v-model="formData.dni"
                    placeholder="DNI"
                    :state="error.dni"
                    required
                    >

                </b-input>
                <b-form-invalid-feedback :state="error.dni">
                    Ingresa un Rut Valido
                </b-form-invalid-feedback>
                <b-input
                    id="input-email"
                    class="mt-2 mb-2 mr-sm-2 mb-sm-0"
                    v-model="formData.email"
                    placeholder="Email"
                    :state="error.email"
                    required
                    >

                </b-input>
                <b-form-invalid-feedback :state="error.email">
                    Debe ser entre 4 a 30
                </b-form-invalid-feedback>
                <b-form-select
                    id="input-selectCountry"
                    v-model="formData.country"
                    class="mt-2 mb-2 mr-sm-2 mb-sm-0"
                    :options="countries"
                    :state="error.country"
                    required
                    >
                
                </b-form-select>
                <b-form-group id="input-buttons" class="mt-3 d-flex justify-content-center" >
                    <b-button type="submit" variant="primary" class="mr-2">Enviar</b-button>
                    <b-button type="reset" variant="danger">Reiniciar</b-button>
                </b-form-group>
            </b-form>
            <b-alert v-show="error.fromBack == true" variant="success" show>Usuario creado con exito</b-alert>
            <b-alert v-show="error.fromBack == false" variant="danger" show>Error revisa los datos ingresados</b-alert>
        </b-container>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { async } from 'q'


export default {
    name:'createClient',
    data() {
        return {
            formData: {               
                dni: '',
                first_name: null,
                last_name: '',
                email: '',
                country: null,
            },
            error: {
                firstName: null,
                lastName: null,
                dni: null,
                email: null,
                country: null,
                fromBack:null
            },
            countries: [],
        }
    },
    methods: {
        getCountries: async function() {
            let listCountries = await Vue.axios.get('http://35.232.225.161:8080/reserv_hotel/countries');
            listCountries = listCountries.data;
            //console.log(listCountries);
            this.countries.push({
                text:'Selecciona una opción',
                value: null
            });
            for(let country of listCountries){
                this.countries.push(country.name)
            };

        },
        create: async function(event){
            event.preventDefault();

            if(this.formData.first_name.length > 3 && this.formData.first_name.length < 21){
                this.error.firstName = true;
            }else{
                this.error.firstName = false;
            }
            if(this.formData.last_name.length > 3 && this.formData.last_name.length < 21){
                this.error.lastName = true;
            }else{
                this.error.lastName = false;
            }
            if(this.formData.dni.length > 7 && this.formData.dni.length <= 11){
                this.error.dni = true;
            }else{
                this.error.dni = false;
            }
            if(this.formData.email.length > 4 && this.formData.email.length <= 30){
                this.error.email = true;

            }else{
                this.error.email = false;
            }
            if(this.formData.country != null){
                this.error.country = true;
            }else{
                this.error.country = false;
            }
            if(this.error.firstName && this.error.lastName && this.error.email && this.error.dni && this.error.country){
                let res = await Vue.axios.post('http://35.232.225.161:8080/reserv_hotel/client/user',this.formData);
                this.formData.first_name = '',
                this.formData.last_name = '',
                this.formData.email = '',
                this.formData.dni = '',
                this.formData.country = null,
                this.error.firstName = null;
                this.error.lastName = null;
                this.error.email = null;
                this.error.dni = null;
                this.error.country = null;
                event.target.reset();
                this.getCountries();
                this.error.fromBack = res.data;
            }else{
                console.log('error desconocio')
                this.error.fromBack = false;
            }
        },
        resetData: function(){
            Object.assign(this.$data, this.$options.data());
        },
        onReset: function(){

        }
    },
    computed: {
        validationFirstName() {
            return this.formData.firstName > 4 && this.formData.firstName < 13;
        },

    },
    created() {
        this.getCountries();
    }
}
</script>