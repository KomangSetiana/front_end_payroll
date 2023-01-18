<template>
  <PageLoader v-if="showDaily.length <= 0" />
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-12 ">
        <h4>Rincian Gaji Harian</h4>
      </div>
    </div>
  </div>
  <div class="card text-center m-3">
    <div class="card-header bg-secondary">Perusahaan</div>
    <div class="card-body">
      <h4 class="card-title ">Slip Gaji</h4>
      <div class="card-text row">

        <div class="col-6">
          <p>Nama</p>
          <p>Divisi</p>
          <p>Status</p>
        </div>
        <template v-for="day in showDaily">
          <div class="col-6">
            <p>{{ day.name }}</p>
            <p>{{ day.division_name }}</p>
            <p>Harian</p>
          </div>
        </template>
      </div>
    </div>
    <div class="card-footer bg-secondary">Rincian Gaji</div>
    <div class="card-text row">

      <div class="col-6">
        <p>Gaji Pokok</p>
        <p>jumlah Kerja</p>
        <p>cuti bulan ini</p>
        <p>Total Masuk Kerja</p>
        <p class="text-bold">Total Gaji</p>
      </div>
      <template v-for="day in showDaily">
        <div class="col-6">
          <p>{{ day.basic_salary }}</p>
          <p>{{ day.hari_kerja_bulan_ini }}</p>
          <p>{{ day.cuti_bulan_ini }}</p>
          <p>{{ day.work_day }}</p>
          <p class="text-bold">Rp. {{ day.salary }}</p>
        </div>
      </template>
    </div>

    <div class="card-footer">

      <router-link to="/daily-salary" class="btn btn-sm btn-primary ml-2">
        <i class="fas fa-angle-double-left"></i> Kembali
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import env from '../../../env'
import PageLoader from '../../components/PageLoader.vue';


export default {
  data() {
    return {
      showDaily: []
    };
  },
  methods: {
    getData() {
      let url = env.VUE_APP_URL + `dailysalary/${this.$route.params.id}`;
      axios.get(url)
        .then((result) => {
          this.showDaily = result.data.data;
          console.log(this.showDaily)
        }).catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mounted() {
    this.getData();
  },
  components: { PageLoader }
}
</script>
