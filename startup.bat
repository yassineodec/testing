@ECHO OFF

:MENU
cmd /c mode con: cols=49 lines=11 && title Proyecto Final && cls
CLS
COLOR C
ECHO Selecciona una opcion:
ECHO -----------------------------------------
ECHO 1 - Encender el backend
ECHO 2 - Encender el servidor
ECHO 3 - Encender el servidor de imagenes
ECHO 4 - Iniciar/Reiniciar backend
ECHO 5 - Encender todos los servicios
ECHO 6 - Salir
ECHO -----------------------------------------
SET /P opcion=Ingrese el numero de la opcion:

IF "%opcion%"=="1" GOTO BACKEND
IF "%opcion%"=="2" GOTO SERVIDOR
IF "%opcion%"=="3" GOTO SERVIDORIMAGENES
IF "%opcion%"=="4" GOTO CERRAR
IF "%opcion%"=="5" GOTO TODOS
IF "%opcion%"=="6" GOTO FIN

:BACKEND
CLS
COLOR 0A
ECHO Encendiendo el backend...
cd backend
start /min node app.js
cd ..
timeout /t 2 >nul
GOTO MENU

:SERVIDOR
CLS
COLOR 0E
ECHO Encendiendo el servidor...
cd frontend
start /min npm run serve
cd ..
timeout /t 2 >nul
GOTO MENU

:SERVIDORIMAGENES
CLS
COLOR 05
ECHO Encendiendo el servidor de imagenes...
cd imageserver
start /min node src/index.js
cd ..
timeout /t 2 >nul
GOTO MENU

:CERRAR
CLS
COLOR 02
ECHO reiniciando o iniciando los servidores...
taskkill /f /im node.exe >nul 2>&1
cd backend & start /min node app.js & cd ..
cd imageserver & start /min node src/index.js & cd ..
GOTO MENU


:TODOS
CLS
COLOR 03
ECHO Encendiendo todos los servicios...
cd backend & start /min node app.js & cd ..
cd frontend & start /min npm run serve & cd ..
cd imageserver & start /min node src/index.js & cd ..
timeout /t 2 >nul
GOTO MENU


:FIN
CLS
COLOR 04
ECHO Saliendo...
timeout /t 3 >nul
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im cmd.exe >nul 2>&1
PAUSE
