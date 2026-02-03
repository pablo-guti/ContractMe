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
        address solicitante;
        address firmante;
    }

    enum EstadoContrato {  Activo, Solicitado, Firmado, Expirado }
    Contrato[] public contratos; 
    
    mapping (uint => address) public contractOwner;
    mapping (address => uint) private ownerCount;
    mapping(address => uint256[]) public contractsSignedByAccount;


    event ContratoCreado(uint indexed id, string titulo, string descripcion, address ownerAddress, uint256 precio, string fechaInicio, string fechaFin);
    event ContratoModificado(uint indexed id, string nuevoTitulo, string nuevaDescripcion, uint256 nuevoPrecio, string nuevaFechaInicio, string nuevaFechaFin);
    event ContratoFirmado(uint indexed id, address firmante);
    event FirmaSolicitada(uint indexed id, address firmante);
    event FirmaRechazada(uint indexed id);


    //Crear, modificar y firmar contratos
    function crearContrato(string memory _titulo, string memory _descripcion, uint256 _precio, string memory _fechaInicio, string memory _fechaFin) public {
        require(_precio > 0, "El precio es igual o inferior a cero");
        uint _id = contratos.length;
        contratos.push(Contrato(_id, _titulo, _descripcion, EstadoContrato.Activo, _precio, _fechaInicio, _fechaFin, address(0),address(0)));
        contractOwner[_id] = msg.sender;
        ownerCount[contractOwner[_id]]++;
        emit ContratoCreado(_id, _titulo, _descripcion, contractOwner[_id], _precio, _fechaInicio, _fechaFin);
    }

    function firmarContrato(uint _id, address firmante) public payable {
        Contrato storage contrato = contratos[_id];
        require(msg.value == contrato.precio, "El monto enviado no coincide con el precio del contrato");
        contrato.estado = EstadoContrato.Firmado;
        contrato.firmante = firmante;
        contractsSignedByAccount[firmante].push(_id);
        payable(firmante).transfer(msg.value);
        emit ContratoFirmado(_id, msg.sender);
    }

    function modificarContrato(uint _id, string memory _nuevoTitulo, string memory _nuevaDescripcion, uint256 _nuevoPrecio, string memory _nuevaFechaInicio, string memory _nuevaFechaFin) public {
        require(_id < contratos.length, "El contrato no existe");
        require(contractOwner[_id] == msg.sender, "Solo el propietario puede modificar el contrato");

        Contrato storage contrato = contratos[_id];
        contrato.titulo = _nuevoTitulo;
        contrato.descripcion = _nuevaDescripcion;
        contrato.precio = _nuevoPrecio;
        contrato.fechaInicio = _nuevaFechaInicio;
        contrato.fechaFin = _nuevaFechaFin;

        emit ContratoModificado(_id, _nuevoTitulo, _nuevaDescripcion, _nuevoPrecio, _nuevaFechaInicio, _nuevaFechaFin);
    }

    function solicitarFirma(uint _id) public {
        Contrato storage contrato = contratos[_id];
        contrato.estado = EstadoContrato.Solicitado;
        contrato.solicitante = msg.sender;
        emit ContratoFirmado(_id, msg.sender);

    }

     function rechazarFirma(uint _id) public {
        Contrato storage contrato = contratos[_id];
        contrato.estado = EstadoContrato.Activo;
        contrato.solicitante = address(0);
        emit FirmaRechazada(_id);

    }


    /*************************************************************/

    function getContrato(uint _id) public view returns (Contrato memory) {
        require(_id < contratos.length, "No existe ningun contrato");
        return contratos[_id];
    }

   
    function obtenerFirmante(uint _id) public view returns (address) {
        require(_id < contratos.length, "No existe ningun contrato con ese ID");
        return contratos[_id].firmante;
    }


    function getContratosFirmados(address _cuenta) public view returns (Contrato[] memory) {
        uint256[] memory ids = contractsSignedByAccount[_cuenta];
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
            if (contractOwner[i] != owner) {
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
