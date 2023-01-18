<template>

  <div class="content ">
    <div class="container ">
      <div class="carousel mt-2">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-interval="5000">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
              aria-label="Slide 4"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/1.JPG" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../assets/2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../assets/3.jpg" class="d-block w-100" alt="...">

            </div>
            <div class="carousel-item">
              <img src="../assets/4.jpg" class="d-block w-100" alt="...">

            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    <div class="row m-4 justify-content-center">
      <div class="col-4">
        <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
          <div class="card-header">Jumlah Karyawan</div>
          <div class="card-body text-center">
            <h2 class="card-title fs-1">{{ employees.length }}</h2>
          </div>
          <div class="bg bg-primary text-center mb-1">
            <router-link to="/employees" class="btn btn-sm text-dark rounded"> <i class="fas fa-eye"></i>
              detail</router-link>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-bg-secondary mb-3" style="max-width: 18rem;">
          <div class="card-header">Perusahaan</div>
          <div class="card-body">
            <h2 class="card-title fs-1">{{ companies.length }}</h2>
          </div>
          <div class="bg bg-secondary text-center mb-1">
            <router-link to="/company" class="btn btn-sm text-dark rounded"> <i class="fas fa-eye"></i>
              detail</router-link>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-bg-success mb-3" style="max-width: 18rem;">
          <div class="card-header">Jabatan</div>
          <div class="card-body">
            <h2 class="card-title fs-1">{{ posisition.length }}</h2>
          </div>
          <div class="bg bg-success text-center mb-1">
            <router-link to="/posisition" class="btn btn-sm text-dark rounded"> <i class="fas fa-eye"></i>
              detail</router-link>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
          <div class="card-header">Divisi</div>
          <div class="card-body">
            <h2 class="card-title fs-1">{{ divisions.length }}</h2>
          </div>
          <div class="bg bg-danger text-center mb-1">
            <router-link to="/employees" class="btn btn-sm text-dark rounded"><i class="fas fa-eye"></i>
              detail</router-link>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-bg-warning mb-3" style="max-width: 18rem;">
          <div class="card-header">Cuti</div>
          <div class="card-body">
            <h5 class="card-title fs-4 text-light">Cuti Karyawan</h5>
          </div>
          <div class="bg bg-warning text-center mb-1 text-">
            <router-link to="/furlough" class="btn btn-sm rounded text-dark"> <i class="fas fa-eye"></i>
              detail</router-link>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card text-bg-info mb-3" style="max-width: 18rem;">
          <div class="card-header">Gaji</div>
          <div class="card-body">
            <h5 class="card-title fs-4 text-light">Gaji Karyawan</h5>
          </div>
          <div class="bg bg-infp text-center mb-1 text-light">
            <router-link to="/salary" class="btn btn-sm rounded"> <i class="fas fa-eye"></i>
              detail</router-link>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import env from '../../env'


export default {
  data() {
    return {
      employees: [],
      companies: [],
      divisions: [],
      posisition: []
    }
  },
  methods: {
    getEmployee() {
      let url = env.VUE_APP_URL + "employee"
      axios.get(url)
        .then((result) => {
          this.employees = result.data.data
        }).catch((err) => {
          console.log(err.response)
        })
    },
    getCompany() {
      let url = env.VUE_APP_URL + "company"
      axios.get(url)
        .then((result) => {
          this.companies = result.data.data
        }).catch((err) => {
          console.log(err.response)
        })
    },
    getPosisition() {
      let url = env.VUE_APP_URL + "posisition"
      axios.get(url)
        .then((result) => {
          this.posisition = result.data.data
        }).catch((err) => {
          console.log(err.response)
        })
    },
    getDivision() {
      let url = env.VUE_APP_URL + "division"
      axios.get(url)
        .then((result) => {
          this.divisions = result.data.data
        }).catch((err) => {
          console.log(err.response)
        })
    }
  },
  mounted() {
    this.getEmployee()
    this.getCompany()
    this.getPosisition()
    this.getDivision()
  }
}
</script>

<style>
.carousel {
  height: 400px;
}

.carousel-inner {
  height: 400px;
}

.col-4 {
  transition-duration: 1s;
  transition-property: transform;

}

.col-4:hover {
  transform: scale(1.1)
}

img {
  filter: brightness(70%);

}
</style>