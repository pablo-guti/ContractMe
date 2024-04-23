// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract MyContract {
    
    struct Contrato {
        uint id;
        string titulo;
        string descripcion;
        EstadoContrato estado;
        uint256 precio;
        uint256 fechaInicio;
        uint256 fechaFin;
    }

    enum EstadoContrato { Inactivo, Activo, Firmado, Finalizado }
    Contrato[] public contratos; 
    
    mapping (uint => address) public contractOwner;

    event ContratoCreado(uint indexed id,string titulo, string descripcion, address ownerAddress, uint256 precio, uint256 fechaInicio, uint256 fechaFin);
    //event ContratoModificado(uint indexed id, string descripcion, address ownerAddress, uint256 fecha);
    //event ContratoFirmado(uint indexed id, address firmante, uint256 fecha);
    //event ContratoFinalizado(uint indexed id, uint256 fecha);

    
    function crearContrato(string memory _descripcion, string memory _titulo, uint256 _precio, uint256 _fechaInicio, uint256 _fechaFin) public {
        require(_precio > 0, "El precio es igual o inferior a cero");
        uint _id = contratos.length;
        contratos.push(Contrato(_id, _titulo, _descripcion, EstadoContrato.Activo, _precio, _fechaInicio, _fechaFin));
        contractOwner[_id] = msg.sender;
        emit ContratoCreado(_id, _titulo, _descripcion, contractOwner[_id], _precio, _fechaInicio, _fechaFin);
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

    /*

    function finalizarContrato(uint _id) public {
        require(contractOwner[_id] == msg.sender, "No tienes permiso para finalizar este contrato");
        require(contratos[_id].estado == EstadoContrato.Firmado, "El contrato no esta firmado");
        
        contratos[_id].estado = EstadoContrato.Finalizado;
        emit ContratoFinalizado(_id, block.timestamp);
    }
    */

    function getContrato(uint _id) public view returns (Contrato memory){
        require(_id < contratos.length, "No existe ningun contrato");
        return contratos[_id];
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

}
