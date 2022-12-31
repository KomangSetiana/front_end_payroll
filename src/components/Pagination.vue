<template>
  <div>
    <button @click="prevPage">Prev</button>
    <button v-for="page in pages" :key="page" :class="{ active: page === currentPage }" @click="goToPage(page)">{{ page }}</button>
    <button @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      pages: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get('/items', {
        params: {
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage
        }
      })
      this.totalItems = data.totalItems
      this.pages = Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, i) => i + 1)
    },
    goToPage(page) {
      this.currentPage = page
      this.fetchData()
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchData()
      }
    },
    nextPage() {
      if (this.currentPage < this.pages.length) {
        this.currentPage++
        this.fetchData()
      }
    }
  }
}
</script>

<style>
.active {
  font-weight: bold;
}
</style>

