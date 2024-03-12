// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract MyContract {

    struct Contrato {
        uint id;
        string descripcion;
        EstadoContrato estado;
    }

    enum EstadoContrato { Inactivo, Activo, Firmado, Finalizado }
    Contrato[] public contratos; 
    
    mapping (uint => address) public contractOwner;

    event ContratoCreado(uint indexed id, string descripcion, address ownerAddress, uint256 fecha);
    event ContratoModificado(uint indexed id, string descripcion, address ownerAddress, uint256 fecha);
    event ContratoFirmado(uint indexed id, address firmante, uint256 fecha);
    event ContratoFinalizado(uint indexed id, uint256 fecha);

    
    function crearContrato(string memory _descripcion) public {
        uint _id = contratos.length;
        contratos.push(Contrato(_id, _descripcion, EstadoContrato.Activo));
        contractOwner[_id] = msg.sender;
        uint256 _fecha = block.timestamp;
        emit ContratoCreado(_id, _descripcion, msg.sender, _fecha);
    }
    
    function modificarContrato(uint _id, string memory _nuevaDescripcion) public {
        require(contractOwner[_id] == msg.sender, "No tienes permiso para modificar este contrato");
        require(contratos[_id].estado == EstadoContrato.Activo, "El contrato no esta en estado activo");
        
        contratos[_id].descripcion = _nuevaDescripcion;
        emit ContratoModificado(_id, _nuevaDescripcion, msg.sender, block.timestamp);
    }

    function firmarContrato(uint _id) public {
        require(contratos[_id].estado == EstadoContrato.Activo, "El contrato no esta en estado activo");
        require(contratos[_id].estado != EstadoContrato.Firmado, "El contrato ya ha sido firmado");
        
        contratos[_id].estado = EstadoContrato.Firmado;
        emit ContratoFirmado(_id, msg.sender, block.timestamp);
    }

    function finalizarContrato(uint _id) public {
        require(contractOwner[_id] == msg.sender, "No tienes permiso para finalizar este contrato");
        require(contratos[_id].estado == EstadoContrato.Firmado, "El contrato no esta firmado");
        
        contratos[_id].estado = EstadoContrato.Finalizado;
        emit ContratoFinalizado(_id, block.timestamp);
    }

   
}
