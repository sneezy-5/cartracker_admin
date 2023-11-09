<script lang="ts" setup>
interface AnalyticCardPropType{
  title: string
  value: string
  icon?: string
  color?: string
}
const props = withDefaults(defineProps<AnalyticCardPropType>(), {
})

</script>
<template>
  <div>
    <v-col class="custom">
      <v-card class="custom-card" :style="{ background: props.color }">
        <v-card-text class="custom-text">
          <v-icon :icon="props.icon"></v-icon>
          {{props.title}}
        </v-card-text>
        <v-card-text class="custom-text text-color"  >
         {{ props.value}}
        </v-card-text>
      </v-card>
    </v-col>
  </div>

</template>

<style lang="scss" scoped>
.custom-card{
background: rgb(233, 187, 187) ;
width: 200px;
height:150px;
border-radius:30px !important;
}
.custom-text{
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
}
.text-color{
  color: rgb(97, 97, 191)
}
</style>
