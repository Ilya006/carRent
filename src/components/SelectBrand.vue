<template>
  <div 
    class="item item--mr" 
    @click="onActiveBrand(name)"
    :class="active && 'active'"
  >
    {{name}}
  </div>
</template>

<script>
export default {
  name: 'SelectBrand',
  props: ['name', 'onActiveBrand', 'active']
}
</script>