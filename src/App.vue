<template>
  <div id="app" class="app app-container">
    <nav id="nav" class="nav">
      <router-link to="/" class="nav__link">Jogar</router-link> |
      <router-link to="/settings" class="nav__link">Configurar</router-link>
    </nav>
    <router-view />
  </div>
</template>
