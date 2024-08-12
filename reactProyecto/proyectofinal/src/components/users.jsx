function MostrarUsers({item}){
    return (
        <div>
            <h1>user id: {item.id}</h1>
            <h1>nombre: {item.nombre}</h1>
            <h1>username: {item.username}</h1>
            <h1>apellidos: {item.apellidos}</h1>
            <h1>fechaDeNaciemiento: {item.apellidos}</h1>
            <h1>email: {item.email}</h1>
            <h1>tipoDeUsuario: {item.tipoDeUsuario}</h1>
            <h1>departamento: {item.departamento}</h1>
            <h1>fechaHoraDeRegistro: {item.fechaHoraDeRegistro}</h1>
            <h1>fechaDeUltimaModificacion: {item.fechaDeUltimaModificacion}</h1>
        </div>
    );
}
export default MostrarUsers;