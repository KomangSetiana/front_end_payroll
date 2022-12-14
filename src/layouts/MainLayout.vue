<template>
  <div class="wrapper">
    <navbar />
    <sidebar />

    <div class="content-wrapper">
      <router-view />
    </div>

    <footer class="main-footer">
      <strong>Copyright &copy; Magang Instiki 2022.</strong>
    </footer>

    <aside class="control-sidebar control-sidebar-dark"></aside>
  </div>
</template>

<script>
import Navbar from "./inc/Navbar.vue";
import Sidebar from "./inc/SideBar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
