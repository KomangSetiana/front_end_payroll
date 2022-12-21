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
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <button type="button" class="btn btn-primary" data-toggle="modal" @click="showModal()">
                <i class="fas fa-user-plus"></i>Tambah Gaji Karyawan
              </button>
            </div>
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Gaji Pokok</th>
                    <th>Status</th>
                    <th>Tunjangan jabatan</th>
                    <th>tunjangan Komunikasi</th>
                    <th>Potongan BPJS</th>
                    <th>Tunjngan Makan</th>
                    <th>Tunjangan Kehadiran</th>
                    <th>Tunjngan Transporstasi</th>
                    <th>Tunjangan Lain</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(salary, index) in salaries.data.allowances" :key="index">
                    <td>{{ salary.id }}</td>
                    <td>{{ salary.employees.name }}</td>
                    <td>{{ salary.basic_salary }}</td>
                    <td>{{ salary.status }}</td>
                    <td>{{ salary.allowances.amount }}</td>
                    <td>{{ salary.gender }}</td>
                    <td>{{ salary.type }}</td>
                    <td>
                      <div class="btn-group">

                        <button class="btn btn-sm btn-warning rounded mr-2" @click="showModalEdit(form = salary)">
                          <i class="fas fa-edit"></i>
                        </button>
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
      <div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal"> Insert Gaji Karyawan</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal"> Update Gaji Karyawan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row" @submit.prevent="statusModal ? update() : storeData()">
                <div class="col-md-6">
                  <label for="name" class="form-label">Nama</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Gaji Pokok</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.nik" />
                </div>
                <div class="col-md-6">
                  <label for="name" class="form-label">Status</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Tunjangan Jabatan</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.nik" />
                </div>
                <div class="col-md-6">
                  <label for="name" class="form-label">Tunjangan Komunikasi</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Potongan BPJS</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.nik" />
                </div>
                <div class="col-md-6">
                  <label for="name" class="form-label">Tunjangan Makan</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Tunjangan Kehadiran</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.nik" />
                </div>
                <div class="col-md-6">
                  <label for="name" class="form-label">Tunjngan Transporstasi</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Tunjngan lain</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.nik" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary" v-show="!statusModal">
                    Simpan
                  </button>
                  <button type="submit" class="btn btn-primary" v-show="statusModal">
                    Ubah
                  </button>
                </div>
              </form>
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


export default {
  data() {
    return {
      statusModal: false,
      salaries: [],
      validation: [],
      form: {
        id: '',

      }
    }
  },
  methods: {

    showModal() {
      this.statusModal = false,
        $("#showModal").modal("show")
    },
    showModalEdit() {
      this.statusModal = true,
        $("#showModal").modal("show")
    },
    getData() {
      let url = env.VUE_APP_URL + 'employee-salary'
      axios.get(url)
        .then((result) => {
          this.salaries = result.data
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    storeData() {
      let url = env.VUE_APP_URL + 'salary'
      axios.post(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
        }).catch((err) => {
          this.validation = err.response
        })
    },
    update() {
      let url = env.VUE_APP_URL + 'employee-salary/' + this.form.id

      axios.put(url, this.form)
        .then(() => {
          this.getData()
          $("#showmodal").modal("hide")
        })
    },


  },
  mounted() {
    this.getData();
  }

}
</script>
  