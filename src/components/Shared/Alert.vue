<template>
  <v-alert :class="type" :color="color" :icon="icon" value="true">
    {{text}}
    </v-alert>

</template>

<script>
  export default {
    props: ['text', 'color', 'type', 'icon']
  }
</script>
