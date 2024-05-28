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
        address firmante;
    }

    enum EstadoContrato {  Activo, Firmado, Expirado }
    Contrato[] public contratos; 
    
    mapping (uint => address) public contractOwner;
    mapping (address => uint) private ownerCount;
    mapping(address => uint256[]) public contratosFirmadosPorCuenta;

    event ContratoCreado(uint indexed id, string titulo, string descripcion, address ownerAddress, uint256 precio, string fechaInicio, string fechaFin);
    event ContratoFirmado(uint indexed id, address firmante);

    function crearContrato(string memory _titulo, string memory _descripcion, uint256 _precio, string memory _fechaInicio, string memory _fechaFin) public {
        require(_precio > 0, "El precio es igual o inferior a cero");
        uint _id = contratos.length;
        contratos.push(Contrato(_id, _titulo, _descripcion, EstadoContrato.Activo, _precio, _fechaInicio, _fechaFin, address(0)));
        contractOwner[_id] = msg.sender;
        ownerCount[contractOwner[_id]]++;
        emit ContratoCreado(_id, _titulo, _descripcion, contractOwner[_id], _precio, _fechaInicio, _fechaFin);
    }

    function firmarContrato(uint _id) public payable {
        Contrato storage contrato = contratos[_id];
        require(contrato.firmante == address(0), "El contrato ya ha sido firmado");
        require(msg.value == contrato.precio, "El monto enviado no coincide con el precio del contrato");
        contrato.firmante = msg.sender;
        contrato.estado = EstadoContrato.Firmado;
        contratosFirmadosPorCuenta[msg.sender].push(_id);
        payable(contractOwner[_id]).transfer(msg.value);
        emit ContratoFirmado(_id, msg.sender);
    }

    function getContrato(uint _id) public view returns (Contrato memory) {
        require(_id < contratos.length, "No existe ningun contrato");
        return contratos[_id];
    }

   
    function obtenerFirmante(uint _id) public view returns (address) {
        require(_id < contratos.length, "No existe ningun contrato con ese ID");
        return contratos[_id].firmante;
    }


    function getContratosFirmados(address _cuenta) public view returns (Contrato[] memory) {
        uint256[] memory ids = contratosFirmadosPorCuenta[_cuenta];
        Contrato[] memory resultado = new Contrato[](ids.length);
        
        for (uint256 i = 0; i < ids.length; i++) {
            resultado[i] = contratos[ids[i]];
        }

        return resultado;
    }


    function getAllContractsToSign (address owner) public view returns (Contrato[] memory){
        require(todosLosContratosSonDelOwner(owner) == false, "El propietario tiene todos los contratos");
        Contrato[] memory contratosAux = new Contrato[](contratos.length - ownerCount[owner]);
        uint count = 0;
        for (uint i=0; i < contratos.length; i++){
            if (contractOwner[i] != owner && contratos[i].firmante == address(0)) {
                contratosAux[count] = contratos[i];
                count++;
            }
        }

        // Redimensiona el array  para eliminar los espacios no utilizados
        assembly {
            mstore(contratosAux, count)
        }
        return contratosAux;
    }

    
    function getAllContractsByOwner (address owner) public view returns (Contrato[] memory){
          require(existenContratosParaOwner(owner), "El propietario no tiene contratos");
        Contrato[] memory contratosAux = new Contrato[](ownerCount[owner]);
        uint count = 0;
        for (uint i=0; i < contratos.length; i++){
            if (contractOwner[i] == owner) {
                contratosAux[count] = contratos[i];
                count++;
            }
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
            count++;
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

    function todosLosContratosSonDelOwner(address owner) internal view returns (bool) {
        for (uint i = 0; i < contratos.length; i++) {
            if (contractOwner[i] != owner) {
                return false;
            }
        }
        return true;
    }

    function existenContratosParaOwner(address owner) public view returns (bool) {
        return ownerCount[owner] > 0;
    }
}
