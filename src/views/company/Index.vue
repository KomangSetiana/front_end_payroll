<template>
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h3>Daftar Perusahaan</h3>
      </div>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <router-link :to="{name: 'company.create'}" class="btn btn-primary text-white">
                <i class="fas fa-user-plus"></i> Tambah Perusahaan
              </router-link>
            </div>
            <!-- <input type="text" v-model="per_page">
            <input type="text" v-model="keyword" placeholder="keyword">
            <button @click="getData()">Refresh</button> -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Perusahaan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(company, index) in companies.data" :key="index">
                    <td>{{ company.id }}</td>
                    <td>{{ company.company_name }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{name: 'company.update',params:{id: company.id }}" class="btn btn-sm btn-warning rounded mr-2">
                          <i class="fas fa-edit"></i>
                        </router-link>
                        <button class="btn btn-sm btn-danger rounded" @click.prevent="destroy(company.id, index)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
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
import env from '../../../env'

export default {
  data() {
    return {
      companies: [],
      per_page:'',
      keyword:'',
      id: ''
    }
  },
  methods: {
    getData() {
      let url = env.VUE_APP_URL + 'company/'
      axios.get(url, {params : {
        per_page : this.per_page,
        keyword : this.keyword
      }}).then((result) => {
          this.companies = result.data
        }).catch((err) => {
          console.log(err.response)
        });
    },
    destroy(id,index) {
      let url = env.VUE_APP_URL + `company/${id}`
      axios.delete(url)
            .then(() => {
            this.companies.data.splice(index, 1)
            }).catch((err) => {
                console.log(err.response.data)
            });
    }
  },
  
  mounted() {
    this.getData();
    this.destroy();
  }
  // setup() {
  //   // reative state
  //   let companys = ref([]);
  //   onMounted(() => {
  //     //get api
  //       axios.get('http://127.0.0.1:8000/api/company').then((result) => {
  //         companys.value = result.data
  //       }).catch((err) => {
  //         console.log(err.response)
  //       });
  //   });
  //   function  destroy(id, index) {
  //     axios.delete(`http://127.0.0.1:8000/api/company/${id}`
  //           )
  //           .then(() => {
  //           companys.value.data.splice(index, 1)
  //           }).catch((err) => {
  //               console.log(err.response.data)
  //           });
    
  // }

  //   return {
  //     companys,
  //     destroy
  //   }
  // }




}
</script>
  