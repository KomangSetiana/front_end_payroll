<template>
  <PageLoader v-if="salaries.length <= 0 ? salaries.length : load" />
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
            <div class="card-header row">
              <button type="button" class="btn btn-primary col-3" data-toggle="modal" @click="showModal()">
                <i class="fas fa-user-plus"></i> Gaji
              </button>
              <form class="col-6 ms-auto" @submit.prevent="getData()">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="keyword">
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
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
                    <td> Tunjangan : </td>
                    <td></td>
                    <td :rowspan="salary.allowances.length + 1">
                      <div class="btn-group">
                        <button class="btn btn-sm btn-warning rounded mr-2" @click="showModalEdit(form = salary)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button @click="destroy(salary.id)" class="btn btn-sm btn-danger rounded ml-1">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-for="allwoance, j in salary.allowances">
                    <template v-if="j >= 0">
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
                <div class="col-12">
                  <label for="name" class="form-label">Nama</label>
                  <select id="inputState" class="form-select" v-model="form.employee_id">
                    <option selected></option>
                    <option v-for="employee in employees.data" :value="employee.id">{{ employee.name }}</option>
                  </select>
                  <div v-if="validation.employee_id" class="text-danger">
                    {{ validation.employee_id[0] }}
                  </div>
                </div>
                <div class="col-8">
                  <label for="nik" class="form-label">Gaji Pokok</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.basic_salary" />
                  <div v-if="validation.basic_salary" class="text-danger">
                    {{ validation.basic_salary[0] }}
                  </div>
                </div>
             
                <div class="col-4">
                  <label for="name" class="form-label">Status</label>
                  <select id="inputState" class="form-select" v-model="form.status">
                    <option value="1">Kontrak</option>
                    <option value="0">Harian</option>
                  </select>
                  <div v-if="validation.status" class="text-danger">
                    {{ validation.status[0] }}
                  </div>
                </div>
                <div class="row">
                <div class="col-6">
                  <label for="inputState" class="form-label">Tipe Tunjangan</label>

                  <select id="inputState" class="form-select" v-model="seletedAllowanceType">

                    <option :value="allow.id" v-for="allow in allowancetypes" > {{ allow.allowance_name }}</option>
                  </select>
                </div>
                <div class="col-4">
                  <label for="inputState" class="form-label">Jumlah</label>
                  <input type="number" class="form-control" v-model="seletedAllowanceValue">
                </div>
                <div class="col-1">
                  <label for="inputState" class="form-label"><br></label>
                  <button v-show="!statusModal" class="btn btn-success " type="button" @click="addListAllowance()">Add</button>
                  <button v-show="statusModal" class="btn btn-success " type="button" @click="addListAllowance()">ubah</button>
                </div>
              </div>
                <div class="col-md-12">
                  <label for="inputState" class="form-label">list Tunjangan</label>
                  <div class="row" v-for=" selec in seletedAllowanceList">
                    <div class="col-6" >
                      {{ selec.allowance_type_id }} 
                      {{ selec.allowance_name }}
                    </div>
                    <div class="col-6">
                      {{ selec.amount }}
                    </div>
                  </div>
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
      seletedAllowanceType: {},
      selectedAllowanceName: {},
      seletedAllowanceValue: {},
      seletedAllowanceList: [],
      statusModal: false,
      salaries: [],
      allowancetypes: [],
      load: [],
      allowances: [],
      validation: [],
      employees: [],
      form: {
        id: '',
        allowances: [

        ]

      }
    }
  },
  components: {
    PageLoader
  },
  methods: {

    showModal() {
      this.validation = []
      this.form = {}
      this.seletedAllowanceList = []
      this.seletedAllowanceType = {},
      this.seletedAllowanceValue = {},
      this.statusModal = false,
        $("#showModal").modal("show")
    },
    showModalEdit() {
      this.validation = []
      this.seletedAllowanceType = {},
      this.seletedAllowanceValue = {},
      this.seletedAllowanceList = []
      this.seletedAllowanceList = this.form.allowances
      this.statusModal = true,
        $("#showModal").modal("show")
    },
    getData() {
      let url = env.VUE_APP_URL + 'employee-salary'
      axios.get(url, {
        params: {
          per_page: this.per_page,
          keyword: this.keyword
        }
      })
        .then((result) => {
          this.salaries = result.data.data
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    storeData() {
      let url = env.VUE_APP_URL + 'employee-salary'
      this.form.allowances = this.seletedAllowanceList
      axios.post(url,this.form)
        .then(() => {
          this.getData();
          $("#showModal").modal("hide");
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Tambah Karyawan Berasil",
            showConfirmButton: false,
            timer: 1500
          });
        }).catch((err) => {
          this.validation = err.response.data.errors;
        })
    },
    update() {
      let url = env.VUE_APP_URL + 'employee-salary/' + this.form.id

      axios.put(url, this.form)
        .then(() => {
          this.getData();
          $("#showModal").modal("hide");
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Update Karyawan Berasil",
            showConfirmButton: false,
            timer: 1500
          });
        }).catch((err) => {
          this.validation = err.response.data.errors;
        })
    },
    destroy(id) {
      this.$swal.fire({
        title: 'Anda Yakin Mau Hapus?',
        text: "data akan hilang!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Tidak",
        confirmButtonText: 'Ya, Hapus!'
      }).then((result) => {
        if (result.value) {
          let url = env.VUE_APP_URL + `employee-salary/${id}`
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
    getEmployees() {
      let url = env.VUE_APP_URL + 'employee/'
      axios.get(url)
        .then((result) => {
          this.employees = result.data
        })
    },
    getDataTunjngan() {
      let url = env.VUE_APP_URL + "allowancetype/";
      axios
        .get(url)
        .then((result) => {
          this.allowancetypes = result.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addListAllowance() {
      
      this.seletedAllowanceList.push({
        'allowance_type_id': this.seletedAllowanceType,
        "allowance_name": this.allowancetypes.filter(x => x.id ==this.seletedAllowanceType)[0].allowance_name,
        'amount': this.seletedAllowanceValue,
      })
      console.log(this.seletedAllowanceList)
    }

  },
  mounted() {
    this.getData();
    this.getEmployees();
    this.getDataTunjngan();
    setTimeout(() => this.load = false, 2000);
  }

}
</script>
  