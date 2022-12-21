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
              <button type="button" class="btn btn-primary" data-toggle="modal" @click="showModal()">
                <i class="fas fa-user-plus"></i>Tambah Karyawan
              </button>
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
                  <tr v-for="(employee, index) in employees.data" :key="index">
                    <td>{{ employee.id }}</td>
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.date_of_birth }}</td>
                    <td>{{ employee.address }}</td>
                    <td>{{ employee.phone }}</td>
                    <td>{{ employee.gender }}</td>
                    <td>{{ employee.type }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{ name: 'employees.show', params: { id: employee.id } }"
                          class="btn btn-sm btn-info rounded mr-1">
                          <i class="fas fa-eye"></i>
                        </router-link>
                        <button class="btn btn-sm btn-warning rounded mr-2" @click="showModalEdit(form = employee)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger rounded ml-1" @click="destroy(employee.id)">
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
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal"> Tambah Karyawan</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal"> Update Karyawan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row" @submit.prevent="statusModal ? update() : storeData()">
                <div class="col-md-6">
                  <label for="name" class="form-label">Nama</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Nik</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.nik" />
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Perusahaan</label>
                  <select id="inputState" class="form-select" v-model="form.company_id">
                    <!-- <option  selected >pilih...</option> -->
                    <option v-for="company in companies.data" :value="company.id">{{ company.company_name }}</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Divisi</label>
                  <select id="inputState" class="form-select" v-model="form.division_id">
                    <option selected>pilih...</option>
                    <option v-for="division in divisions.data" :value="division.id"> {{ division.division_name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Jabatan</label>
                  <select id="inputState" class="form-select" v-model="form.posisition_id">
                    <option selected>pilih..</option>
                    <option v-for="posisition in posisitions.data" :value="posisition.id">{{ posisition.posisition_name
                    }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputAddress2" class="form-label">Alamat</label>
                  <input type="text" class="form-control" id="inputAddress2" v-model="form.address" />
                </div>
                <div class="col-md-4">
                  <label for="inputCity" class="form-label">Tempat Lahir</label>
                  <input type="text" class="form-control" id="inputCity" v-model="form.place_of_birth" />
                </div>
                <div class="col-md-4">
                  <label for="inputZip" class="form-label">Tanggal Lahir</label>
                  <input type="date" class="form-control" id="inputZip" v-model="form.date_of_birth" />
                </div>
                <div class="col-md-3">
                  <label for="inputState" class="form-label">Jenis Kelamin</label>
                  <select id="inputState" class="form-select" v-model="form.gender">
                    <option selected>{{ form.gender }}</option>
                    <option value="male"> Male</option>
                    <option value="female"> Female</option>
                  </select>
                </div>

                <div class="col-md-4">
                  <label for="inputCity" class="form-label">Telepon</label>
                  <input type="number" class="form-control" id="inputCity" v-model="form.phone" />
                </div>
                <div class="col-md-4">
                  <label for="inputCity" class="form-label">Agama</label>
                  <input type="text" class="form-control" id="inputCity" v-model="form.religion" />
                </div>
                <div class="col-md-3">
                  <label for="inputState" class="form-label">Tipe</label>
                  <select id="inputState" class="form-select" v-model="form.type">
                    <option selected>{{ form.type }}</option>
                    <option value="contract">Contract</option>
                    <option value="daily">Daily</option>
                  </select>
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
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </section>
</template>
  
  
<script>

import axios from 'axios'
import env from '../../../env'


export default {
  data() {
    return {
      statusModal: false,
      employees: [],
      validation: [],
      companies: [],
      divisions: [],
      posisitions: [],
      form: {
        id: '',
        companies: {
          id: '',
          company_name: ''
        },
        posisitions: {
          id: '',
          posisition_name: '',
        },
        divisions: {
          id: '',
          division_name: ''
        }
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
      let url = env.VUE_APP_URL + 'employee'
      axios.get(url, {
        params: {
          keyword: this.keyword
        }
      })
        .then((result) => {
          this.employees = result.data
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    storeData() {
      let url = env.VUE_APP_URL + 'employee'
      axios.post(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tambah Karyawan Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        }).catch((err) => {
          this.validation = err.response
        })
    },
    update() {
      let url = env.VUE_APP_URL + 'employee/' + this.form.id

      axios.put(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update Karyawan Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    destroy(id) {
      this.$swal.fire({
        title: 'Anda Yakin Mau Hapus ?',
        text: "Data Akan Hilang!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya, Yakin!'
      }).then((result) => {
        if (result.value) {
          let url = env.VUE_APP_URL + `employee/${id}`
          axios.delete(url)
            .then(() => {
              this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Delete Data Berasil',
                showConfirmButton: false,
                timer: 1500
              })
              this.getData();
            }).catch(() => {
              his.$swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Delete Data Gagal',
                showConfirmButton: false,
                timer: 1500
              })
            })
        }
      })
    },
    getCompany() {
      let url = env.VUE_APP_URL + 'company'
      axios.get(url)
        .then((result) => {
          this.companies = result.data
        }).catch((err) => {
          this.validation = err.response.data
        })
    },
    getDivision() {
      let url = env.VUE_APP_URL + 'division'
      axios.get(url)
        .then((result) => {
          this.divisions = result.data
        }).catch((err) => {
          this.validation = err.response.data
        })
    },
    getPosisition() {
      let url = env.VUE_APP_URL + 'posisition'
      axios.get(url)
        .then((result) => {
          this.posisitions = result.data
        }).catch((err) => {
          this.validation = err.response.data
        })
    }
  },
  mounted() {
    this.getData();
    this.getCompany();
    this.getDivision();
    this.getPosisition();
  }

}
</script>
  