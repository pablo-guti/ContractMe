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
2. Ejecuta `npm install` en la terminal. Tener en cuenta que la version de node que estoy utilizando es la 21.7.1
3. Instalar ExpoGo en el dispositivo Android/IOS
4. Ejecuta `npx expo start` en la terminal y deesde ExpoGo escanear el código QR que aparece


- [ ] A tener en cuenta: Por el momento la dirección por defecto para concectarse a Ganache es http://192.168.1.35:7545 y es necesario indicarlo en todos los archivos donde aparece esta dorección de manera hardcodeada, pero estoy trabajando en encontrar una solución para que esto sea mas "configurable"


