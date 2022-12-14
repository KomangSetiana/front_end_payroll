<template>
    <div class=" contaner">
        <h4 class="m-3">Tambah Tipe Cuti</h4>
        <div class="row m-3">
            <div class="col-6">

                <div class=" card rounded shadow">
                    <div class="card-header">
                        <router-link :to="{name: 'furloughtype'}" class="btn btn-primary btn-sm rounded shadow mb-3"><i
                                class="fas fa-arrow-alt-circle-left"></i> Kembali</router-link>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="mb-3">
                                <label for="" class="form-label">Tipe Cuti</label>
                                <input type="text" class="form-control" v-model="furloughtype.furlough_name">
                                <div v-if="validation.furloughtype_name" class="text-danger">
                                    {{ validation.furloughtype_name }}
                                </div>
                            </div>
                            <button class="btn btn-primary"><i class="fas fa-save"></i> Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //data binding
        const furloughtype = reactive({
            furlough_name: ''
        });
        const validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post('http://127.0.0.1:8000/api/furloughtype', furloughtype
            )
            .then(() => {
                router.push({
                    name: 'furloughtype'
                })
            }).catch((err) => {
                validation.value = err.response.data;
            });
        }
        return {
            furloughtype,
            validation,
            router,
            store
        }
    }
}
</script>
