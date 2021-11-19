const url2 = "http://localhost:4000/marca";

const getMarcas = () => {
    $.ajax({
        method: "GET",
        url: url2
    }).done(function (res) {
        content = "";
        res = res.listMarcas
        for (let i = 0; i < res.length; i++) {
            content += `
                        <tr>
                            <td>${res[i].id}</td>
                            <td>${res[i].nombre}</td>
                            <td>
                                <button type="button" onclick="getMarcaById(${res[i].id})" data-bs-toggle="modal" data-bs-target="#modalModificarMarca" class="btn btn-outline-primary"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button onclick="deleteMarca(${res[i].id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;
        }
        $("#table > tbody").html(content);

    });
};

const getMarcaById = async (id) => {
    await $.ajax({
        method: "GET",
        url: url2 + '/' + id
    }).done(res =>{
        console.log(res.auto);
        document.getElementById("nombreMarca1").value = res.marca[0].nombre;
        document.getElementById("idMarca1").value =res.marca[0].id;
    });
};

const createMarca = async() => {
    let marca = new Object();
    marca.nombre = document.getElementById("nombreMarca").value;
    
    await $.ajax({
        method: "POST",
        url: url2 + '/create',
        data: marca
    }).done(res => {
        Swal.fire({
            title: 'La marca ha sido registrada',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("closeMarca").click();
                getMarcas();
                getAutos();
            }
        });
    });
};

const updateMarca = async() =>{
    let marca = new Object();
    marca.id = document.getElementById("idMarca1").value;
    marca.nombre = document.getElementById("nombreMarca1").value;
    
    await $.ajax({
        method: "POST",
        url: url2 + '/update/' + marca.id,
        data: marca
    }).done(res =>{
        Swal.fire({
            title: 'La marca ha sido modificada',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("closeM").click();
                getMarcas();
                getAutos();
            }
        });
    });
};

const deleteMarca = async(id)=>{
    console.log("a");
    await $.ajax({
        method: "POST",
        url: url2 + '/delete/'+id
    }).done(res =>{
        console.log("done");
        Swal.fire({
            title: 'La marca ha sido eliminada',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getMarcas();
                getAutos();
            }
        });
    }).fail(res =>{
        console.log("Fail");
        Swal.fire({
            title: 'La marca NO ha sido eliminada',
            confirmButtonText: 'Ok',
            icon: 'error',
        }).then((result) => {
            if (result.isConfirmed) {
                getMarcas();
                getAutos();
            }
        });
    });
};