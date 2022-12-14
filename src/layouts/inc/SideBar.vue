<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <li class="brand-link">
      <span class="brand-text font-weight-light">Sistem Penggajian <i class="fas fa-wallet"></i></span>
    </li>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <li class="d-block text-white">
          <h4>Lumbung Group</h4>
          </li>
        </div>
      </div>

      <router-link to="/" class="text-white nav-link">
        <i class="fas fa-tachometer-alt"></i>
        Dashboard
      </router-link>

      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-header">DATA</li>

          <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts"
            aria-expanded="false" aria-controls="collapseLayouts">
            <div class="sb-nav-link-icon"></div>
            <i class="fas fa-folder-open"></i> Master Data
            <!-- <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div> -->
          </a>
          <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
              <router-link :to="{name: 'company'}" class="nav-link ml-4"><i class="far fa-building"> Perusahaan</i></router-link>
              <router-link :to="{name: 'posisition'}" class="nav-link ml-4"><i class="fas fa-user-graduate"></i>
                Jabatan</router-link>
              <router-link :to="{name: 'division'}" class="nav-link ml-4"><i class="fas fa-shield-alt"></i> Divisi</router-link>
              <router-link :to="{name: 'employees'}" class="nav-link ml-4"><i class="fas fa-users"></i> Karyawan</router-link>
              <router-link :to="{name: 'salary'}" class="nav-link ml-4"><i class="fas fa-money-bill-wave"></i> Gaji</router-link>
              <router-link :to="{name: 'allowancetype'}" class="nav-link ml-4"><i class="fas fa-file-invoice"></i> Tipe
                Tunjangan</router-link>
              <router-link :to="{name : 'furloughtype'}" class="nav-link ml-4"><i class="fas fa-file-invoice"></i> Tipe
                Cuti</router-link>
            </nav>
          </div>
        
          <li class="nav-header">REPORT</li>
          <a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false"
            aria-controls="collapsePages">
            <div class="sb-nav-link-icon"></div>
            <i class="fas fa-book"></i> Report Salary
          </a>
          <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
              <router-link :to="{name: 'daily-salary'}" class="nav-link collapsed ml-4" >
                <i class="fas fa-book-open"></i> Daily Salary
              </router-link>
              <router-link :to="{name: 'contract-salary'}" class="nav-link collapsed ml-4">
                <i class="fas fa-book-open"></i> Contract Salary
              </router-link>
              <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"></div>
            </nav>
          </div>
          <li class="nav-header">CUTI</li>
          <router-link to="/furlough" class="nav-link"><i class="fas fa-bookmark"></i> Cuti Karyawan</router-link>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import Navitem from "./Navitem.vue";
export default {
  components: {
    Navitem,
  },
};
</script>
