// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract MyContract {
    
    struct Contrato {
        uint id;
        string titulo;
        string descripcion;
        EstadoContrato estado;
        uint256 precio;
        string fechaInicio;
        string fechaFin;
    }

    enum EstadoContrato {  Activo, Firmado, Finalizado }
    Contrato[] public contratos; 
    
    mapping (uint => address) public contractOwner;
    mapping (address => uint) private ownerCount;

    event ContratoCreado(uint indexed id,string titulo, string descripcion, address ownerAddress, uint256 precio, string fechaInicio, string fechaFin);
    //event ContratoModificado(uint indexed id, string descripcion, address ownerAddress, uint256 fecha);
    //event ContratoFirmado(uint indexed id, address firmante, uint256 fecha);
    //event ContratoFinalizado(uint indexed id, uint256 fecha);

    
    function crearContrato(string memory _titulo, string memory _descripcion, uint256 _precio, string memory _fechaInicio, string memory _fechaFin) public {
        require(_precio > 0, "El precio es igual o inferior a cero");
        uint _id = contratos.length;
        contratos.push(Contrato(_id, _titulo, _descripcion, EstadoContrato.Activo, _precio, _fechaInicio, _fechaFin));
        contractOwner[_id] = msg.sender;
        ownerCount[contractOwner[_id]]++;
        emit ContratoCreado(_id, _titulo, _descripcion, contractOwner[_id], _precio, _fechaInicio, _fechaFin);
    }

     function getContrato(uint _id) public view returns (Contrato memory){
        require(_id < contratos.length, "No existe ningun contrato");
        return contratos[_id];
    }

    // Función que verifica si todos los contratos asociados a un propietario son suyos
    function todosLosContratosSonDelOwner(address owner) internal view returns (bool) {
        for (uint i = 0; i < contratos.length; i++) {
            if (contractOwner[i] != owner) {
                return false; // Si se encuentra un contrato que no es del propietario, devuelve falso
            }
        }
        return true; // Si todos los contratos son del propietario, devuelve verdadero
    }

    function getAllContractsToSign (address owner) public view returns (Contrato[] memory){
        require(contratos.length > 0, "Aun no existen contratos");
        require(!todosLosContratosSonDelOwner(owner), "Todos los contratos son de una misma cuenta");
        Contrato[] memory contratosAux = new Contrato[](contratos.length);
        uint count = 0;
        for (uint i=0; i < contratos.length; i++){
            if (contractOwner[i] != owner)
            contratosAux[count] = contratos[i];
            count ++;
        }

        // Redimensiona el array  para eliminar los espacios no utilizados
        assembly {
            mstore(contratosAux, count)
        }
        return contratosAux;
    }

    // Función que verifica si existen contratos para un propietario específico
    function existenContratosParaOwner(address owner) public view returns (bool) {
        return ownerCount[owner] > 0;
    }


    function getAllContractsByOwner (address owner) public view returns (Contrato[] memory){
         require(existenContratosParaOwner(owner), "El propietario no tiene contratos");
        Contrato[] memory contratosAux = new Contrato[](ownerCount[owner]);
        uint count = 0;
        for (uint i=0; i < contratos.length; i++){
            if (contractOwner[i] == owner)
            contratosAux[count] = contratos[i];
            count ++;
        }

        // Redimensiona el array  para eliminar los espacios no utilizados
        assembly {
            mstore(contratosAux, count)
        }
        return contratosAux;
    }

    function getAllContracts () public view returns (Contrato[] memory){
        require(contratos.length > 0, "Aun no existen contratos");
        Contrato[] memory contratosAux = new Contrato[](contratos.length);
        uint count = 0;
        for (uint i=0; i < contratos.length; i++){
            contratosAux[count] = contratos[i];
            count ++;
        }

        // Redimensiona el array  para eliminar los espacios no utilizados
        assembly {
            mstore(contratosAux, count)
        }
        return contratosAux;
    }
    

    function getOwner(uint _id) public view returns (address) {
        require(_id < contratos.length, "No existe ningun contrato con ese ID");
        return contractOwner[_id];
    }

    
    /*
    function modificarContrato(uint _id, string memory _nuevaDescripcion) public {
        require(contractOwner[_id] == msg.sender, "No tienes permiso para modificar este contrato");
        require(contratos[_id].estado == EstadoContrato.Activo, "El contrato no esta en estado activo");
        
        contratos[_id].descripcion = _nuevaDescripcion;
        emit ContratoModificado(_id, _nuevaDescripcion, msg.sender, block.timestamp);
    }
    */

    /*
    function firmarContrato(uint _id) public {
        require(contratos[_id].estado == EstadoContrato.Activo, "El contrato no esta en estado activo");
        require(contratos[_id].estado != EstadoContrato.Firmado, "El contrato ya ha sido firmado");
        
        contratos[_id].estado = EstadoContrato.Firmado;
        emit ContratoFirmado(_id, msg.sender, block.timestamp);
    }*/


    

   

}
