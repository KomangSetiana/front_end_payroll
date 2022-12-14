<template>
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h3>Daftar Tunjangan</h3>
        </div>
      </div>
    </div>
  
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6">
            <div class="card">
              <div class="card-header">
                <router-link :to="{name: 'allowancetype.create'}" class="btn btn-primary text-white">
                  <i class="fas fa-user-plus"></i> Tambah Tunjangan
                </router-link>
              </div>
  
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tunjangan</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(allowancetype, index) in allowancetypes.data"
                      :key="index"
                    >
                      <td>{{ allowancetype.id }}</td>
                      <td>{{ allowancetype.allowance_name }}</td>
                      <td>{{ allowancetype.status }}</td>
                      <td>
                        <div class="btn-group">
                          <router-link :to="{name: 'allowancetype.update', params:{id: allowancetype.id}}" class="btn btn-sm btn-warning rounded mr-2">
                            <i class="fas fa-edit"></i>
                          </router-link>
                          <button class="btn btn-sm btn-danger rounded" @click.prevent="destroy(allowancetype.id, index)">
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
          let allowancetypes = ref([]);
  
          onMounted(() => {
              //get api
              axios.get('http://127.0.0.1:8000/api/allowancetype')
              .then((result) => {
                  allowancetypes.value = result.data
              }).catch((err) => {
                  console.log(err.response)
              });
          });
          function  destroy(id, index) {
      axios.delete(`http://127.0.0.1:8000/api/allowancetype/${id}`
            )
            .then(() => {
            allowancetypes.value.data.splice(index, 1)
            }).catch((err) => {
                console.log(err.response.data)
            });
    
  }

  
          return {
              allowancetypes,
              destroy
          }
      }
      
  
  }
  </script>
  