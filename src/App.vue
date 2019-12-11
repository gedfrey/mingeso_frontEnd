<template>
  <div id="app">
        <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand :to="{name: 'home'}">Mingesoft</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav mr-auto>
          <!-- <b-nav-item :to="{name: 'grid'}">Home</b-nav-item> -->
          <b-nav-item-dropdown text="Clientes" right>
            <b-dropdown-item :to="{name: 'createClient'}">Crear Cliente</b-dropdown-item>
            <b-dropdown-item :to="{name: 'listClients'}">Buscar Cliente</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Reservas" rigth>
            <b-dropdown-item :to="{name: 'createReservation'}">Crear Reserva</b-dropdown-item>
            <b-dropdown-item :to="{name: 'listReservations'}">Buscar Reservas</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{name: 'bookingCode'}">Libro de Reservas</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<style>
