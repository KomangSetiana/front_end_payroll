<template>
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h3>Daftar Karyawan</h3>
        </div>
      </div>
    </div>
  
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <router-link :to="{name: 'employee.create'}" class="btn btn-primary text-white">
                  <i class="fas fa-user-plus"></i> Tambah Karyawan
                </router-link>
              </div>
  
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Tanggal Lahir</th>
                      <th>Alamat</th>
                      <th>Telepon</th>
                      <th>Jenis Kelamin</th>
                      <th>Tipe</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(employee, index) in employees.data"
                      :key="index"
                    >
                      <td>{{ employee.id }}</td>
                      <td>{{ employee.name }}</td>
                      <td>{{ employee.date_of_birth }}</td>
                      <td>{{employee.address}}</td>
                      <td>{{employee.phone}}</td>
                      <td>{{employee.gender}}</td>
                      <td>{{employee.type}}</td>
                      <td>
                        <div class="btn-group">
                            <router-link :to="{name : 'employees.show', params: {id: employee.id}}" class="btn btn-sm btn-info rounded mr-1">
                            <i class="fas fa-eye"></i>
                          </router-link >
                          <router-link :to="{name: 'employees.update', params: {id: employee.id}}" class="btn btn-sm btn-warning rounded">
                            <i class="fas fa-edit"></i>
                          </router-link>
                          <button to="/" class="btn btn-sm btn-danger rounded ml-1">
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
  import env from '../../../env'
  import {onMounted, ref} from 'vue'
  
  export default {
      data (){
        return {
          employees: [],
        }
      },
  methods: {
    getData() {
      let url = env.VUE_APP_URL + 'employee'
      axios.get(url)
      .then((result) => {
        this.employees = result.data
      }).catch((err) =>{
        console.log(err.response.data)
      })
    }
  },
  mounted() {
    this.getData();
  }
  
  }
  </script>
  