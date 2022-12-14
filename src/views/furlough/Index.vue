<template>
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h3>Daftar Karyawan Cuti</h3>
        </div>
      </div>
    </div>
  
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-10">
            <div class="card">
              <div class="card-header">
                <router-link :to="{name: 'furlough.create'}" class="btn btn-primary text-white">
                  <i class="fas fa-user-plus"></i> Tambah Cuti
                </router-link>
              </div>
  
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Cuti</th>
                      <th>Tanggal</th>
                      <th>Deskripsi</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(furlough, index) in furloughs.data"
                      :key="index"
                    >
                      <td>{{ furlough.id }}</td>
                      <td>{{ furlough.employees.name }}</td>
                      <td>{{ furlough.furlough_types.furlough_name }}</td>
                      <td>{{furlough.date}}</td>
                      <td>{{furlough.description}}</td>
                      <td>
                        <div class="btn-group">
                          <router-link :to="{name: 'furlough.update', params:{id: furlough.id}}" class="btn btn-sm btn-warning rounded mr-2">
                            <i class="fas fa-edit"></i>
                          </router-link>
                          <button class="btn btn-sm btn-danger rounded" @click.prevent="destroy(furlough.id, index)">
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
  import {onMounted, ref} from 'vue'
  import env from '../../../env'
  
  export default {
     data() {
      return {
        furloughs: []
      }
     },
     methods: {
      getData() {
        let url = env.VUE_APP_URL + 'furlough'
        axios.get(url)
        .then((result) =>{
          this.furloughs = result.data
        }).catch((err) => {
          console.log(err.response)
        })
      }
    },

Mounted() {
this.getData();
}
     
  
  }
  </script>
  