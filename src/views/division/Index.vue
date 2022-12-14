<template>
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h3>Daftar Divisi</h3>
        </div>
      </div>
    </div>
  
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6">
            <div class="card">
              <div class="card-header">
                <router-link :to="{name: 'division.create'}" class="btn btn-primary text-white">
                  <i class="fas fa-user-plus"></i> Tambah Divisi
                </router-link>
              </div>
  
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Divisi</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(division, index) in divisions.data"
                      :key="index"
                    >
                      <td>{{ division.id }}</td>
                      <td>{{ division.division_name }}</td>
                      <td>
                        <div class="btn-group">
                          <router-link :to="{name: 'division.update', params:{id: division.id}}" class="btn btn-sm mr-2 btn-warning rounded">
                            <i class="fas fa-edit"></i>
                          </router-link>
                          <button class="btn btn-sm btn-danger rounded" @click.prevent="destroy(division.id, index)">
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
  
  export default {
      setup() {
               // reative state
          let divisions = ref([]);
  
          onMounted(() => {
              //get api
              axios.get('http://127.0.0.1:8000/api/division')
              .then((result) => {
                  divisions.value = result.data
              }).catch((err) => {
                  console.log(err.response)
              });
          });
          function  destroy(id, index) {
      axios.delete(`http://127.0.0.1:8000/api/division/${id}`
            )
            .then(() => {
            divisions.value.data.splice(index, 1)
            }).catch((err) => {
                console.log(err.response.data)
            });
    
  }

  
          return {
              divisions,
              destroy
          }
      }
      
  
  }
  </script>
  