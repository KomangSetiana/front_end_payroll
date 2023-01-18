<template>
  <PageLoader v-if="contractsalaries.length <= 0 ? contractsalaries.length : load" />
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h3>Laporan Gaji Karyawan Kontrak</h3>
      </div>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              Laporan Bulan ini
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
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Divisi</th>
                    <th>Nama</th>
                    <th>Gaji Pokok</th>
                    <th>Tunjangan Tetap</th>
                    <th>Tunjangan Tidak Tetap</th>
                    <th>Total Gaji</th>
                    <th>Sisa Cuti</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contractsalary, index) in searchResult" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ contractsalary.division_name }}</td>
                    <td>{{ contractsalary.name }}</td>
                    <td>{{ contractsalary.basic_salary }}</td>
                    <td>{{ contractsalary.allowance_permanet }}</td>
                    <td>{{ contractsalary.allowance_non_permanet }}</td>
                    <td>{{ contractsalary.salary }}</td>
                    <td>{{ contractsalary.remainder_furlough }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{ name: 'contract-salary.show', params: { id: contractsalary.id } }"
                          class="btn btn-info rounded mr-1">
                          <i class="fas fa-eye"></i> detail
                        </router-link>
                      </div>
                    </td>
                  </tr>
                </tbody>
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
      contractsalaries: [],
      pagination: {},
      active: {},
      prev: {},
      next: {},
      search: '',
      from: '',
      to: '',
      total: '',
      load: [],
    }
  },
  methods: {
    getData(page) {
      let url = env.VUE_APP_URL + `contractsalary?page=${page}`;
      axios.get(url)
        .then((result) => {
          this.contractsalaries = result.data.data;
          this.pagination = result.data.meta.last_page;
          this.active = result.data.meta.current_page
          this.prev = result.data.links.prev
          this.next = result.data.links.next

          this.from = result.data.meta.from
          this.to = result.data.meta.to
          this.total = result.data.meta.total

        }).catch((err) => {
          console.log(err.response)
        });
    }
  },

  components: {
    PageLoader
  },
  mounted() {
    this.getData();
    setTimeout(() => this.load = false, 2000);

  },
  computed: {
    searchResult() {
      let employee = this.contractsalaries
      console.log(this.search)

      if (this.search != '' && this.search) {
        employee = employee.filter((item) => {
          return item.name
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
