<template>
  <PageLoader v-if="companies.length <= 0"/>
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-12">
        <h3>Daftar Perusahaan</h3>
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
                <i class="fas fa-user-plus"></i>Tambah Perusahaan
              </button>
            </div>
            <!-- <input type="text" v-model="per_page">
            <input type="text" v-model="keyword" placeholder="keyword">
            <button @click="getData()">Refresh</button> -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Perusahaan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(company, index) in companies" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ company.company_name }}</td>
                    <td>
                      <div class="btn-group">
                        <button class="btn btn-sm btn-warning rounded mr-2" @click="showModalEdit(form = company)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger rounded" @click="destroy(company.id)">
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
      <!-- Modal -->
      <div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal"> Tambah Perusahaan</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal"> Update Perusahaan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="statusModal ? update() : storeData()">
                <div class="mb-3">
                  <label for="" class="form-label">Nama Perusahaan</label>
                  <input type="text" class="form-control" v-model="form.company_name">
                </div>
                <div v-if="validation.company_name"  class="text-danger">
                  {{ validation.company_name[0] }}
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
import axios from "axios";
import env from "../../../env";
import PageLoader from "../../components/PageLoader.vue";

export default {
  data() {
    return {
      statusModal: false,
      companies: [],
      validation: [],
      form: {
        id: '',
        company_name: ''
      }
    };
  },
  components: {
    PageLoader
  },

  methods: {
    showModal() {
      this.form = {
      },
      this.validation =[]
      this.statusModal = false,
        $("#showModal").modal("show");
    },
    showModalEdit() {
      this.validation = []
      this.statusModal = true;
      this.getData()
      $("#showModal").modal("show");

    },
    getData() {
      let url = env.VUE_APP_URL + "company/";
      axios
        .get(url, {
          params: {
            per_page: this.per_page,
            keyword: this.keyword,
          },
        })
        .then((result) => {
          this.companies = result.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    storeData() {

      let url = env.VUE_APP_URL + "company";
      axios.post(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tambah Perusahaan Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          this.validation = err.response.data.errors;
        });
    },
    update() {
      let url = env.VUE_APP_URL + 'company/' + this.form.id
      axios.put(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update Perusahaan Berasil',
            showConfirmButton: false,
            timer: 1500
          })

        }).catch((err) => {
          this.validation = err.response.data.errors
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
        confirmButtonText: 'Ya, Hapus!'
      }).then((result) => {
        if (result.value) {
          let url = env.VUE_APP_URL + `company/${id}`
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
    }
  },
  mounted() {
    this.getData();

  },
  // setup() {
  //   // reative state
  //   let companys = ref([]);
  //   onMounted(() => {
  //     //get api
  //       axios.get('http://127.0.0.1:8000/api/company').then((result) => {
  //         companys.value = result.data
  //       }).catch((err) => {
  //         console.log(err.response)
  //       });
  //   });
  //   function  destroy(id, index) {
  //     axios.delete(`http://127.0.0.1:8000/api/company/${id}`
  //           )
  //           .then(() => {
  //           companys.value.data.splice(index, 1)
  //           }).catch((err) => {
  //               console.log(err.response.data)
  //           });

  // }

  //   return {
  //     companys,
  //     destroy
  //   }
  // }
};
</script>
