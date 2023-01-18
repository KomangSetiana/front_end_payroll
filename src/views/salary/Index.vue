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
              <div class="col-6 ms-auto">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Masukan Nama Karyawan..." v-model="search" />
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
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
                <template v-for="(salary, index) in searchResult" :key="index">
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
            <div class="ml-3">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">

                  <li class="page-item" :class="{ 'disabled': !prev }">
                    <a class="page-link" href="#" @click.prevent="getData(active - 1)" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item" v-for="page in pagination" :key="page" :class="{ 'active': page == active }">
                    <a class="page-link" href="#" @click.prevent="getData(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ 'disabled': !next }">
                    <a class="page-link" href="#" @click.prevent="getData(active + 1)" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <div class="mb-3">
                Showing {{ from }} to {{ to }} of {{ total }} entries
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MODAL -->
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

                      <option :value="allow.id" v-for="allow in allowancetypes"> {{ allow.allowance_name }}</option>
                    </select>
                  </div>
                  <div class="col-4">
                    <label for="inputState" class="form-label">Jumlah</label>
                    <input type="number" class="form-control" v-model="seletedAllowanceValue">
                  </div>
                  <div class="col-1">
                    <label for="inputState" class="form-label"><br></label>
                    <button v-show="!statusModal" class="btn btn-success " type="button"
                      @click="addListAllowance()">Add</button>
                    <button v-show="statusModal" class="btn btn-success " type="button"
                      @click="addListAllowanceUpdate()">Add</button>

                  </div>
                </div>
                <!-- List Store -->
                <div class="col-md-12" v-show="!statusModal">
                  <label for="inputState" class="form-label">list Tunjangan</label>
                  <div class="row" v-for=" (selec, index) in seletedAllowanceList">
                    <div class="col-4">
                      {{ selec.allowance_type_id }}
                      {{ selec.allowance_name }}
                    </div>
                    <div class="col-4">
                      {{ selec.amount }}
                    </div>
                    <div class="col-4 ">
                      <button @click="deletelist(index)" type="button" class="btn btn-sm btn-danger m-1"><i
                          class="far fa-trash-alt"></i></button>
                    </div>
                  </div>
                </div>
                <!-- Update Allowances -->
                <div class="col-md-12" v-show="statusModal">
                  <label for="inputState" class="form-label">list Tunjangan</label>
                  <div class="row" v-for=" (selec, index) in seletedAllowanceUpdate">
                    <div class="col-4">
                      {{ selec.allowance_type_id }}
                      {{ selec.allowance_name }}
                    </div>
                    <div class="col-4">
                      {{ selec.amount }}
                    </div>
                    <div class="col-4 ">
                      <button @click="deletelistUpdate(index)" type="button" class="btn btn-sm btn-danger m-1"><i
                          class="far fa-trash-alt"></i></button>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary" v-show="!statusModal" :disabled="disabled">
                    <i v-show="loading" class="fas fa-spinner fa-spin"></i> Simpan
                  </button>
                  <button type="submit" class="btn btn-primary" v-show="statusModal" :disabled="disabled">
                    <i v-show="loading" class="fas fa-spinner fa-spin"></i> Ubah
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
      seletedAllowanceUpdate: [],
      statusModal: false,
      disabled: false,
      loading: false,
      salaries: [],
      per_page: 30,
      pagination: {},
      search: '',
      active: {},
      prev: {},
      next: {},
      from: '',
      to: '',
      total: '',
      allowancetypes: [],
      load: [],
      allowances: [],
      validation: [],
      employees: [],
      data_allowance: [],
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
      this.loading = false;
      this.disabled = false;
      this.seletedAllowanceList = []
      this.seletedAllowanceType = {},
        this.seletedAllowanceValue = {},
        this.statusModal = false,
        $("#showModal").modal("show")
    },
    showModalEdit() {
      this.validation = []
      this.loading = false;
      this.disabled = false;
      this.form.employee_id = this.form.employees.id
      this.seletedAllowanceType = {},
        this.seletedAllowanceValue = {},
        this.data_allowance = []

      this.form.allowances.forEach(element => {
        console.log(element)
        this.data_allowance.push({
          'allowance_type_id': element.allowance_type_id,
          "allowance_name": element.allowance_types.allowance_name,
          'amount': element.amount,

        })
      });
      this.seletedAllowanceUpdate = this.data_allowance
      this.statusModal = true,
        $("#showModal").modal("show")
    },
    getData(page) {
      let url = env.VUE_APP_URL + `employee-salary?page=${page}`
      axios.get(url, {
        params: {
          per_page: this.per_page,
          keyword: this.keyword
        }
      })
        .then((result) => {
          this.salaries = result.data.data
          this.pagination = result.data.meta.last_page;
          this.active = result.data.meta.current_page
          this.prev = result.data.links.prev
          this.next = result.data.links.next


          this.from = result.data.meta.from
          this.to = result.data.meta.to
          this.total = result.data.meta.total
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    storeData() {
      this.loading = true;
      let url = env.VUE_APP_URL + 'employee-salary'
      this.form.allowances = this.seletedAllowanceList
      axios.post(url, this.form)
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
      this.loading = true;
      let url = env.VUE_APP_URL + 'employee-salary/' + this.form.id
      this.form.allowances = this.seletedAllowanceUpdate
      console.log(this.seletedAllowanceList)
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
              this.$swal.fire({
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
        "allowance_name": this.allowancetypes.filter(x => x.id == this.seletedAllowanceType)[0].allowance_name,
        'amount': this.seletedAllowanceValue,
      })

    },
    addListAllowanceUpdate() {

      this.seletedAllowanceUpdate.push({
        'allowance_type_id': this.seletedAllowanceType,
        "allowance_name": this.allowancetypes.filter(x => x.id == this.seletedAllowanceType)[0].allowance_name,
        'amount': this.seletedAllowanceValue,
      })
    },
    deletelist(index) {
      this.seletedAllowanceList.splice(index, 1)
    },
    deletelistUpdate(index) {
      this.seletedAllowanceUpdate.splice(index, 1)
    }

  },
  mounted() {
    this.getData();
    this.getEmployees();
    this.getDataTunjngan();
    setTimeout(() => this.load = false, 2000);
  },
  computed: {
    searchResult() {
      let employee = this.salaries
      console.log(this.search)

      if (this.search != '' && this.search) {
        employee = employee.filter((item) => {
          return item.employees.name
            .toUpperCase()
            .includes(this.search.toUpperCase())
            // item.divisions.division_name.toUpperCase.includes(this.search.toUpperCase())
        })
      }
      return employee
    }
  }

}
</script>
