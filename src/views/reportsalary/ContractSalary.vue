<template>
  <PageLoader v-if="contractsalarys.length <= 0" />
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h3>Laporan Gaji Karyawan Kontrak</h3>
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
                    <th>Tunjangan Tetap</th>
                    <th>Tunjangan Tidak Tetap</th>
                    <th>Total Gaji</th>
                    <th>Sisa Cuti</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contractsalary, index) in contractsalarys" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ contractsalary.division_name }}</td>
                    <td>{{ contractsalary.name }}</td>
                    <td>{{ contractsalary.basic_salary }}</td>
                    <td>{{ contractsalary.allowance_permanet }}</td>
                    <td>{{ contractsalary.allowance_non_permanet }}</td>
                    <td>{{ contractsalary.salary }}</td>
                    <td>{{ contractsalary.remainder_furlough }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link to="/contractsalarys/show/:id" class="btn btn-sm btn-outline-info rounded mr-1">
                          detail
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
import { onMounted, ref } from 'vue'
import PageLoader from "../../components/PageLoader.vue";

export default {
  setup() {
    // reative state
    let contractsalarys = ref([]);

    onMounted(() => {
      //get api
      axios.get('http://127.0.0.1:8000/api/contractsalary')
        .then((result) => {
          contractsalarys.value = result.data.data
        }).catch((err) => {
          console.log(err.response)
        });
    });

    return {
      contractsalarys
    }
  },
  components : {
    PageLoader
  }


}
</script>
  