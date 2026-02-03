const MyContract = artifacts.require("MyContract");

contract("MyContract", (accounts) => {
  let myContract;
  const owner = accounts[0];
  const firmante = accounts[1];
  const noAutorizado = accounts[2];

  before(async () => {
    myContract = await MyContract.deployed();
  });

  it("Crear nuevo contrato", async () => {
    const titulo = "Contrato 1";
    const descripcion = "Descripción del contrato 1";
    const precio = web3.utils.toWei("1", "ether");
    const fechaInicio = "2024-07-01";
    const fechaFin = "2024-07-31";
    const contratoID = 0;

    const transaccion = await myContract.crearContrato(
      titulo,
      descripcion,
      precio,
      fechaInicio,
      fechaFin,
      { from: owner }
    );

    const contrato = await myContract.contratos(contratoID);

    assert.equal(
      contrato.id,
      contratoID,
      "El ID del contrato creado no es correcto"
    );
    assert.equal(contrato.titulo, titulo, "El título del contrato no coincide");
    assert.equal(
      contrato.descripcion,
      descripcion,
      "La descripción del contrato no coincide"
    );
    assert.equal(
      contrato.precio.toString(),
      precio,
      "El precio del contrato no coincide"
    );
    assert.equal(
      contrato.fechaInicio,
      fechaInicio,
      "La fecha de inicio del contrato no coincide"
    );
    assert.equal(
      contrato.fechaFin,
      fechaFin,
      "La fecha de fin del contrato no coincide"
    );

    assert.equal(
      transaccion.logs.length,
      1,
      "Se esperaba que se emita un evento"
    );
    assert.equal(
      transaccion.logs[0].event,
      "ContratoCreado",
      "El evento emitido no es ContratoCreado"
    );

    const event = transaccion.logs[0].args;

    assert.equal(
      event.id.toNumber(),
      contratoID,
      "El ID del contrato no coincide"
    );
    assert.equal(event.titulo, titulo, "El título del contrato no coincide");
    assert.equal(
      event.descripcion,
      descripcion,
      "La descripción del contrato no coincide"
    );
    assert.equal(
      event.ownerAddress,
      owner,
      "La dirección del propietario no coincide"
    );
    assert.equal(
      event.precio.toString(),
      precio,
      "El precio del contrato no coincide"
    );
    assert.equal(
      event.fechaInicio,
      fechaInicio,
      "La fecha de inicio del contrato no coincide"
    );
    assert.equal(
      event.fechaFin,
      fechaFin,
      "La fecha de fin del contrato no coincide"
    );
  });

  it("Firmar contrato", async () => {
    const contratoID = 0;
    const precioContrato = web3.utils.toWei("1", "ether");

    const transaccion = await myContract.firmarContrato(contratoID, firmante, {
      from: firmante,
      value: precioContrato,
    });

    const contrato = await myContract.contratos(contratoID);

    assert.equal(
      contrato.estado.toString(),
      "2",
      "El estado del contrato no es Firmado"
    );
    assert.equal(
      contrato.firmante,
      firmante,
      "El firmante del contrato no coincide"
    );

    assert.equal(
      transaccion.logs.length,
      1,
      "Se esperaba que se emita un evento"
    );
    assert.equal(
      transaccion.logs[0].event,
      "ContratoFirmado",
      "El evento emitido no es ContratoFirmado"
    );

    const event = transaccion.logs[0].args;

    assert.equal(
      event.id.toNumber(),
      contratoID,
      "El ID del contrato no coincide"
    );
    assert.equal(
      event.firmante,
      firmante,
      "El firmante del contrato no coincide"
    );
  });

  it("Modificar contrato", async () => {
    const contratoID = 0;
    const nuevoTitulo = "Contrato 1 Modificado";
    const nuevaDescripcion = "Descripción del contrato 1 Modificado";
    const nuevoPrecio = web3.utils.toWei("2", "ether");
    const nuevaFechaInicio = "2024-08-01";
    const nuevaFechaFin = "2024-08-31";

    const transaccion = await myContract.modificarContrato(
      contratoID,
      nuevoTitulo,
      nuevaDescripcion,
      nuevoPrecio,
      nuevaFechaInicio,
      nuevaFechaFin,
      { from: owner }
    );

    const contrato = await myContract.contratos(contratoID);

    assert.equal(
      contrato.titulo,
      nuevoTitulo,
      "El título del contrato no coincide"
    );
    assert.equal(
      contrato.descripcion,
      nuevaDescripcion,
      "La descripción del contrato no coincide"
    );
    assert.equal(
      contrato.precio.toString(),
      nuevoPrecio,
      "El precio del contrato no coincide"
    );
    assert.equal(
      contrato.fechaInicio,
      nuevaFechaInicio,
      "La fecha de inicio del contrato no coincide"
    );
    assert.equal(
      contrato.fechaFin,
      nuevaFechaFin,
      "La fecha de fin del contrato no coincide"
    );

    assert.equal(
      transaccion.logs.length,
      1,
      "Se esperaba que se emita un evento"
    );
    assert.equal(
      transaccion.logs[0].event,
      "ContratoModificado",
      "El evento emitido no es ContratoModificado"
    );

    const event = transaccion.logs[0].args;

    assert.equal(
      event.id.toNumber(),
      contratoID,
      "El ID del contrato no coincide"
    );
    assert.equal(
      event.nuevoTitulo,
      nuevoTitulo,
      "El título del contrato no coincide"
    );
    assert.equal(
      event.nuevaDescripcion,
      nuevaDescripcion,
      "La descripción del contrato no coincide"
    );
    assert.equal(
      event.nuevoPrecio.toString(),
      nuevoPrecio,
      "El precio del contrato no coincide"
    );
    assert.equal(
      event.nuevaFechaInicio,
      nuevaFechaInicio,
      "La fecha de inicio del contrato no coincide"
    );
    assert.equal(
      event.nuevaFechaFin,
      nuevaFechaFin,
      "La fecha de fin del contrato no coincide"
    );
  });

  it("Error al crear contrato con precio invalido", async () => {
    const titulo = "Contrato Invalido";
    const descripcion = "Descripción del contrato invalido";
    const precio = web3.utils.toWei("0", "ether");
    const fechaInicio = "2024-07-01";
    const fechaFin = "2024-07-31";

    try {
      await myContract.crearContrato(
        titulo,
        descripcion,
        precio,
        fechaInicio,
        fechaFin,
        { from: owner }
      );
      assert.fail("Se esperaba una excepción");
    } catch (error) {
      assert.include(
        error.message,
        "El precio es igual o inferior a cero",
        "El mensaje de error no es correcto"
      );
    }
  });

  it("Error al firmar contrato, cantidad envíada insuficiente", async () => {
    const contratoID = 0;
    const precioIncorrecto = web3.utils.toWei("0.5", "ether");

    try {
      await myContract.firmarContrato(contratoID, firmante, {
        from: firmante,
        value: precioIncorrecto,
      });
      assert.fail("Se esperaba una excepción");
    } catch (error) {
      assert.include(
        error.message,
        "El monto enviado no coincide con el precio del contrato",
        "El mensaje de error no es correcto"
      );
    }
  });

  it("Error al modificar contrato sin ser propietario", async () => {
    const contratoID = 0;
    const nuevoTitulo = "Contrato Invalido";
    const nuevaDescripcion = "Descripción del contrato invalido";
    const nuevoPrecio = web3.utils.toWei("2", "ether");
    const nuevaFechaInicio = "2024-08-01";
    const nuevaFechaFin = "2024-08-31";

    try {
      await myContract.modificarContrato(
        contratoID,
        nuevoTitulo,
        nuevaDescripcion,
        nuevoPrecio,
        nuevaFechaInicio,
        nuevaFechaFin,
        { from: firmante }
      );
      assert.fail("Se esperaba una excepción");
    } catch (error) {
      assert.include(
        error.message,
        "Solo el propietario puede modificar el contrato",
        "El mensaje de error no es correcto"
      );
    }
  });
});
