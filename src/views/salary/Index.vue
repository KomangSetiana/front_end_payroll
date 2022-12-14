<template>
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h3>Daftar Gaji Karyawan</h3>
        </div>
      </div>
    </div>
  
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <router-link :to="{name: 'salary.create'}" class="btn btn-primary text-white">
                  <i class="fas fa-user-plus"></i> Tambah Karyawan
                </router-link>
              </div>
  
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Gaji Pokok</th>
                      <th>Status</th>
                      <th>Tunjangan Jabatan</th>
                      <th>Tunjangan Komunikasi</th>
                      <th>Potongan BPJS</th>
                      <th>Tunjangan Makan</th>
                      <th>Tunjangan Kehadiran</th>
                      <th>Tunjangan Transportasi</th>
                      <th>Tunjangan Lain</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(salary, index) in salaries.data"
                      :key="index"
                    >
                      <td>{{ salary.id }}</td>
                      <td>{{ salary.employees.name }}</td>
                      <td>{{ salary.basic_salary }}</td>
                      <td>{{salary.status}}</td>
                      <td>{{salary.allowances.allowance_type_id }}</td>
                      <td>{{salary.gender}}</td>
                      <td>{{salary.gender}}</td>
                      <td>{{salary.gender}}</td>
                      <td>{{salary.gender}}</td>
                      <td>{{salary.gender}}</td>
                      <td>{{salary.type}}</td>
                      <td>
                        <div class="btn-group">
                            <router-link :to="{name: 'salary.show', params:{id: salary.id}}" class="btn btn-sm btn-outline-info rounded mr-1">
                            <i class="fas fa-eye"></i>
                          </router-link >
                          <router-link :to="{name: 'salary.update', params:{id: salary.id}}" class="btn btn-sm btn-outline-warning rounded">
                            <i class="fas fa-edit"></i>
                          </router-link>
                          <button class="btn btn-sm btn-outline-danger rounded ml-1">
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
          let salaries = ref([]);
  
          onMounted(() => {
              //get api
              axios.get('http://127.0.0.1:8000/api/employee-salary')
              .then((result) => {
                  salaries.value = result.data
              }).catch((err) => {
                  console.log(err.response)
              });
          });
  
          return {
              salaries
          }
      }
      
  
  }
  </script>
  