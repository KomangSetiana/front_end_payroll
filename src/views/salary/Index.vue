<template>
  <PageLoader v-if="salaries.length <= 0" />
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
                    <th colspan="2">Tunjangan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <template v-for="(salary, index) in salaries" :key="index">
                  <tr>
                    <td :rowspan="salary.allowances.length + 1">{{ index + 1 }}</td>
                    <td :rowspan="salary.allowances.length + 1">{{ salary.employees.name }}</td>
                    <td :rowspan="salary.allowances.length + 1">{{ salary.basic_salary }}</td>
                    <td :rowspan="salary.allowances.length + 1">{{ salary.status }}</td>
                    <td>Tunjangan Jabatan {{ salary.allowances[0].allowance_name }}</td>
                    <td>{{ salary.allowances[0].amount }}</td>
                    <td :rowspan="salary.allowances.length + 1">
                      <div class="btn-group">
                        <button class="btn btn-sm btn-warning rounded mr-2"
                          @click="showModalEdit(form = salary.allowances)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button to="/" class="btn btn-sm btn-danger rounded ml-1">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="allwoance, j in salary.allowances">
                    <template v-if="j > 0">
                      <td>{{ allwoance.allowance_types.allowance_name }}</td>
                      <td>{{ allwoance.amount }}</td>
                    </template>
                  </tr>
                </template>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal"> Masukan Gaji Karyawan</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal"> Update Gaji Karyawan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row" @submit.prevent="statusModal ? update() : storeData()">
                <div class="col-md-6">
                  <label for="name" class="form-label">Nama</label>
                  <select id="inputState" class="form-select" v-model="form.posisition_id">
                    <option selected></option>
                    <option v-for="employee in employees.data" :value="employee.id">{{ employee.name }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Gaji Pokok</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.basic_salary" />
                </div>
                <div class="col-md-6">
                  <label for="name" class="form-label">Status</label>
                  <select id="inputState" class="form-select" v-model="form.status">
                    <option value="1">Kontrak</option>
                    <option value="0">Harian</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Tunjangan Jabatan</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.allowances" />
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
import PageLoader from "../../components/PageLoader.vue";


export default {
  data() {
    return {

      statusModal: false,
      salaries: [],
      allowances: [],
      validation: [],
      employees: [],
      form: {
        id: '',

      }
    }
  },
  components: {
    PageLoader
  },
  methods: {

    showModal() {
      this.form = {}
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
          this.salaries = result.data.data
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
    getEmployees() {
      let url = env.VUE_APP_URL + 'employee/'
      axios.get(url)
        .then((result) => {
          this.employees = result.data
        })
    }


  },
  mounted() {
    this.getData();
    this.getEmployees();
  }

}
</script>
  