<template>
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h3>Tambah Karyawan</h3>
            </div>
        </div>
    </div>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Nama</label>
                                    <input type="email" class="form-control" id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Nik</label>
                                    <input type="password" class="form-control" id="inputPassword4" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">Perusahaan</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">Divisi</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">Jabatan</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="inputAddress2" class="form-label">Alamat</label>
                                    <input type="text" class="form-control" id="inputAddress2"
                                         />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputCity" class="form-label">Tempat Lahir</label>
                                    <input type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputZip" class="form-label">Tanggal Lahir</label>
                                    <input type="date" class="form-control" id="inputZip" />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputState" class="form-label">Jenis Kelamin</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                              
                                <div class="col-md-4">
                                    <label for="inputCity" class="form-label">Telepon</label>
                                    <input type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputCity" class="form-label">Agama</label>
                                    <input type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputState" class="form-label">Tipe</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary">Simpan</button>
                                </div>
                            </form>
                            <div class="card-body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
