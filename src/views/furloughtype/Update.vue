<template>
    <div class=" contaner">
        <h4 class="m-3">Edit Tipe Cuti</h4>
        <div class="row m-3">
            <div class="col-6">

                <div class=" card rounded shadow">
                    <div class="card-header">
                        <router-link :to="{name: 'furloughtype'}" class="btn btn-primary btn-sm rounded shadow mb-3"><i
                                class="fas fa-arrow-alt-circle-left"></i> Kembali</router-link>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update">
                            <div class="mb-3">
                                <label for="" class="form-label">Tipe Cuti</label>
                                <input type="text" class="form-control" v-model="furloughtype.furlough_name">
                                <div v-if="validation.furlough_name" class="text-danger">
                                    {{ validation.furlough_name }}
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
import { reactive, ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //data binding
        let furloughtype = reactive({
            furlough_name: ''
        });
        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() =>{
            axios.get(`http://127.0.0.1:8000/api/furloughtype/${route.params.id}`)
            .then((result) => {
                furloughtype.furlough_name = result.data.data.furlough_name
            }).catch((err) =>{
                console.log(err.response.data)
            })   
        })

        function update() {
            axios.put(`http://127.0.0.1:8000/api/furloughtype/${route.params.id}`, furloughtype
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
            update
        }
    }
}
</script>
