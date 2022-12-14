<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 v-if="tittle"> <i :class="icon" v-if="icon">{{tittle}}</i></h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    props: {
        tittle: {
            type: String,
            default: null,
        },
        icon: {
            type: String,
            default : null,
        },
        beforeMount(){
            let tittle = this.$store.state.app.name;
            tittle = this.tittle ? '${this.tittle} | ${tittle}' : tittle;
            $('tittle').html(tittle);
        }
    }
}
</script>
