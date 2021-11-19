const url = "http://localhost:4000/autos";

const getAutos = () => {
    $.ajax({
        method: "GET",
        url: url
    }).done(function (res) {
        content = "";
        res = res.listAutos
        for (let i = 0; i < res.length; i++) {
            content += `
                        <tr>
                            <td>${res[i].id}</td>
                            <td>${res[i].nombre}</td>
                            <td>${res[i].matricula}</td>
                            <td>${res[i].verificacion}</td>
                            <td>${res[i].fecha_registro}</td>
                            <td>${res[i].fecha_actualizacion}</td>
                            <td>${res[i].estado ==1?"Activo":"Inactivo"} </td>
                            <td>${res[i].marca}</td>
                            <td>
                                <button type="button" onclick="getAutoById(${res[i].id})" data-bs-toggle="modal" data-bs-target="#modalModificarAuto" class="btn btn-outline-primary"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button onclick="deleteAuto(${res[i].id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;
        }
        $("#table2 > tbody").html(content);

    });
};

const getAutoById = async (id) => {
    await $.ajax({
        method: "GET",
        url: url + '/' + id
    }).done(res =>{
        console.log(res.auto);
        document.getElementById("nombre1").value = res.auto[0].nombre;
        document.getElementById("matricula1").value = res.auto[0].matricula;
        document.getElementById("verificacion1").value = res.auto[0].verificacion;
        document.getElementById("marcaFk1").value = res.auto[0].marca;
        document.getElementById("id1").value =res.auto[0].id;
    });
};

const createAuto = async() => {
    let auto = new Object();
    auto.nombre = document.getElementById("nombre").value;
    auto.matricula = document.getElementById("matricula").value;
    auto.verificacion = document.getElementById("verificacion").value;
    auto.marca = document.getElementById("marcaFk").value;
    
    await $.ajax({
        method: "POST",
        url: url + '/create',
        data: auto
    }).done(res => {
        Swal.fire({
            title: 'El auto ha sido registrado',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("closeAuto").click();
                getMarcas();
                getAutos();
            }
        })
    });
};

const updateAuto = async() =>{
    let auto = new Object();
    auto.id = document.getElementById("id1").value;
    auto.nombre = document.getElementById("nombre1").value;
    auto.matricula = document.getElementById("matricula1").value;
    auto.verificacion = document.getElementById("verificacion1").value;
    auto.marca = document.getElementById("marcaFk1").value;
    
    await $.ajax({
        method: "POST",
        url: url + '/update/' + auto.id,
        data: auto
    }).done(res =>{
        Swal.fire({
            title: 'El auto ha sido modificado',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getMarcas();
                getAutos();
                document.getElementById("closeA").click();
            }
        })
    });
};

const deleteAuto = async(id)=>{
    await $.ajax({
        method: "POST",
        url: url + '/delete/'+id
    }).done(res =>{
        Swal.fire({
            title: 'El auto ha sido desactivado',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getMarcas();
                getAutos();
            }
        })
    });
};