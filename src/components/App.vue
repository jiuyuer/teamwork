<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'content',
  components: { 
    'Navbar': Navbar
  }
}
</script>
