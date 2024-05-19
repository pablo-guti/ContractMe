# UVA-ContractMe

## Compilar y desplegar contratos

Para compilar y  desplegar el contrato ejecutar

```
truffle compile
truffle migrate 
```
Para poder interactuar con el contrato en necesario Ganache GUI 

Una vez desplegado el contrato se puede interactuar con el desde la consola ejecutando

```
truffle console
```

Un ejemplo sería el siguiente

```
const myContract = await MyContract.deployed();
await myContract.operacion_deseada();
```

## Para previsualizar y ejecutar el proyecto en tu dispositivo:

1. Abre la carpeta del proyecto en **Visual Studio Code**, en este caso hay que dirigirse a la carpeta /Front-End-Contractme.
2. Ejecuta `npm install` en la terminal.
3. Ejecuta `npx expo start` en la terminal.
4. El puerto por defecto es 192.161.1.35



