# UVA-ContractMe

## Compilar y desplegar contratos

Lo primero es instalar truffe de manera global
```
npm install -g truffle
```
Además hay que instalar ganache desde este enlace https://archive.trufflesuite.com/ganache/


Para compilar y  desplegar el contrato ejecutar

```
truffle compile
truffle migrate 
```
Para poder interactuar con el contrato en necesario que Ganache Gui este corriendo en el mismo puerto que se indica en el archivo /truffle-config.js

**Nota:** Aparecera el siguiente error al migrar el contrato a la red:
```
This version of µWS is not compatible with your Node.js build:

Error: Cannot find module '../binaries/uws_win32_x64_120.node'''
```
Este error no es relevante, simplemte ignorarlo


- Una vez compilado el contraro se generará un archivo .json en /build/contracts. Coger ese archivo y pegarlo en la ruta /Front-End-ContractMe/contracts. **Este paso es muy importante**




## Para previsualizar y ejecutar el proyecto en tu dispositivo:

1. Abre la carpeta del proyecto en **Visual Studio Code**, en este caso hay que dirigirse a la carpeta /Front-End-Contractme.
2. Ejecuta `npm install` en la terminal. Tener en cuenta que la version de node que estoy utilizando es la 21.7.1
3. Instalar ExpoGo en el dispositivo Android/IOS. **Muy importante**: Instalar la version 50 de Expo Go desde su página oficial https://expo.dev/go
4. Ejecuta `npx expo start` en la terminal y deesde ExpoGo escanear el código QR que aparece


**-Nota**: La dirección por defecto para concectarse a Ganache es http://192.168.1.35:7545, pero se puede cambiar si es necesarios desde el archivo de configuración situado en Front-End-ContractMe/global.js


