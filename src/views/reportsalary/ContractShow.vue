<template>
  <PageLoader v-if="showContract.length <= 0" />
  <div class="container-fluid">
    <div class="row justify-content-center mb-2">
      <div class="col-12 ">
        <h4>Rincian Gaji Kontrak</h4>

      </div>
    </div>
  </div>
  <di class="row justify-content-center">
    <div class="col-12">
      <div class="card text-center m-3">
        <div class="card-header bg-secondary">Perusahaan</div>
        <div class="card-body">
          <h4 class="card-title fw-light">Slip Gaji</h4>
          <div class="card-text row">
            <div class="col-6">
              <p>Nama</p>
              <p>Divisi</p>
              <p>Status</p>
            </div>
            <template v-for="day in showContract">
              <div class="col-6">
                <p>{{ day.name }}</p>
                <p>{{ day.division_name }}</p>
                <p>Kontrak</p>
              </div>
            </template>
          </div>
        </div>
        <div class="card-footer bg-secondary">Rincian Gaji</div>
        <div class="card-text row">
          <div class="col-6">
            <p>Gaji Pokok</p>
            <p> Total Tunjangan Tetap</p>
            <p>Total Tunjangan Non Tetap </p>
            <p>sisa cuti</p>
            <p>cuti bulan ini</p>
            <p class="text-bold">Total Gaji</p>
          </div>
          <template v-for="day in showContract">
            <div class="col-6">
              <p>{{ day.basic_salary }}</p>
              <p>{{ day.allowance_permanet }}</p>
              <p>{{ day.allowance_non_permanet }}</p>
              <p>{{ day.remainder_furlough }}</p>
              <p>{{ day.cuti_bulan_ini }}</p>
              <p class="text-bold">{{ day.salary }}</p>
            </div>
          </template>
        </div>
        <div class="card-footer"> <router-link to="/contract-salary" class="btn  btn-primary ml-2">
            <i class="fas fa-angle-double-left"></i> Kembali
          </router-link></div>
      </div>
    </div>
  </di>
</template>

<script>
import axios from 'axios'
import env from '../../../env'
import PageLoader from '../../components/PageLoader.vue';


export default {
  data() {
    return {
      showContract: []
    };
  },
  methods: {
    getData() {
      let url = env.VUE_APP_URL + `contractsalary/${this.$route.params.id}`;
      axios.get(url)
        .then((result) => {
          this.showContract = result.data.data;
          console.log(this.showContract)
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
