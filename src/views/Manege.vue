<template>
  <el-container style="min-height: 100vh;">
    <el-aside :width="sideWidth + 'px'"
      style="background-color: rgba(238, 241, 246, 0.981); box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>
    <el-container>
      <el-header style="border-bottom: 1px solid #ccc">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Aside from '@/components/Aside'
import Header from '@/components/Header'
export default {
  name: 'HomeView',
  components: {
    Aside,
    Header,
  },
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true
    }
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.sideWidth = 64;
        this.logoTextShow = false;
      } else {
        this.collapseBtnClass = 'el-icon-s-fold';
        this.sideWidth = 200;
        this.logoTextShow = true;
      }
    }
  }
};
</script>
