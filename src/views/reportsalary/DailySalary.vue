<template>
  <PageLoader v-if="dailysalaries.length <= 0 ? dailysalaries.length : load" />
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h3>Laporan Gaji Karyawan Harian</h3>
      </div>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              Laporan Bulan ini
            </div>

            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Divisi</th>
                    <th>Nama</th>
                    <th>Gaji Pokok</th>
                    <th>Total Gaji</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(dailysalary, index) in dailysalaries" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ dailysalary.division_name }}</td>
                    <td>{{ dailysalary.name }}</td>
                    <td>{{ dailysalary.basic_salary }}</td>
                    <td>{{ dailysalary.salary }}</td>
                    <td>
                      <div class="btn-group">
                       <router-link :to="{name : 'daily-salary.show',params:{id: dailysalary.id} }" class="btn btn-info">
                        <i class="fas fa-eye"></i> detail
                       </router-link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  
<script>

import axios from 'axios'
import env from '../../../env'
import PageLoader from "../../components/PageLoader.vue";

export default {
  data() {
    return {
      dailysalaries: [],
      load: []
    }
  },
  methods: {
    getData() {
      let url = env.VUE_APP_URL + "dailysalary";
      axios.get(url)
        .then((result) => {
          this.dailysalaries = result.data.data;
        }).catch((err) => {
          console.log(err.response)
        });
    }
  },

  components: {
    PageLoader
  },
  mounted() {
    this.getData();
    setTimeout(() => this.load = false, 2000);
  }



}
</script>
  