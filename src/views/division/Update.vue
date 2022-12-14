<template>
    <div class=" contaner">
        <h4 class="m-3">Edit Divisi</h4>
        <div class="row m-3">
            <div class="col-6">

                <div class=" card rounded shadow">
                    <div class="card-header">
                        <router-link :to="{name: 'division'}" class="btn btn-primary btn-sm rounded shadow mb-3"><i
                                class="fas fa-arrow-alt-circle-left"></i> Kembali</router-link>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update">
                            <div class="mb-3">
                                <label for="" class="form-label">Divisi</label>
                                <input type="text" class="form-control" v-model="division.division_name">
                                <div v-if="validation.division_name" class="text-danger">
                                    {{ validation.division_name }}
                                </div>
                            </div>
                            <button class="btn btn-primary" @click.prevent="destroy(division.id, index)"><i class="fas fa-save"></i> Simpan</button>
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
        let division = reactive({
            division_name: ''
        });
        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() =>{
            axios.get(`http://127.0.0.1:8000/api/division/${route.params.id}`)
            .then((result) => {
                division.division_name = result.data.data.division_name
            }).catch((err) =>{
                console.log(err.response.data)
            })   
        })

        function update() {
            axios.put(`http://127.0.0.1:8000/api/division/${route.params.id}`, division
            )
            .then(() => {
                router.push({
                    name: 'division'
                })
            }).catch((err) => {
                validation.value = err.response.data;
            });
        }
        return {
            division,
            validation,
            router,
            update
        }
    }
}
</script>
