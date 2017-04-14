<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
   components: {}
 }
</script>

<style>
 @import url(https://fonts.googleapis.com/css?family=Lato:300);

 * {
   margin: 0;
   padding: 0;
 }

 html,
 body {
   background-color: transparent;
   height: 100%;
 }

 body {
   align-items: center;
   display: flex;
   font-family: Lato, Helvetica, sans-serif;
   justify-content: center;
   text-align: center;
   padding-top: 50px;
 }
</style>
