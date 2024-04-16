# UVA-ContractMe

## Compilar y desplegar contratos

Para compilar y  desplegar el contrato ejecutar

```
truffle compile
truffle migrate -network development
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

1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Ejecuta `npm install` en la terminal.
3. Ejecuta `npx expo start` en la terminal.
4. Para ejecutar en un dispositivo iOS (solo en MacOS):
    - Presiona `i` para verlo en el simulador de iOS o sigue las instrucciones [aquí](https://docs.expo.dev/workflow/run-on-device/) para ejecutarlo en un dispositivo físico.
5. Para ejecutar en un dispositivo Android:
    - Presiona `a` para verlo en un Dispositivo Virtual de Android o sigue las instrucciones [aquí](https://docs.expo.dev/workflow/run-on-device/) para ejecutarlo en un dispositivo físico.



