<template>
  <PageLoader v-if="dailysalaries.length <= 0 ? dailysalaries.length : load" />
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h3>Laporan Gaji Karyawan Harian</h3>
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
                    <th>Total Gaji</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(dailysalary, index) in searchResult" :key="index">
                    <td>{{ index+ 1 }}</td>
                    <td>{{ dailysalary.division_name }}</td>
                    <td>{{ dailysalary.name }}</td>
                    <td>{{ dailysalary.basic_salary }}</td>
                    <td>{{ dailysalary.salary }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{ name: 'daily-salary.show', params: { id: dailysalary.id } }"
                          class="btn btn-info">
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
      dailysalaries: [],
      pagination: {},
      active: {},
      search: '',
      prev: {},
      next: {},
      from: '',
      to: '',
      total: '',
      load: []
    }
  },
  methods: {
    getData(page = 1) {
      let url = env.VUE_APP_URL + `dailysalary?page=${page}`;
      axios.get(url)
        .then((result) => {
          this.dailysalaries = result.data.data;
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
      let employee = this.dailysalaries
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
