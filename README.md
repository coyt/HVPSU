# HVPSU
Electron Application for High Voltage Power Supply Controller

<p align="center">
<img width="800px" src="https://raw.githubusercontent.com/coyt/HVPSU/main/images/softwarescreencap1.PNG"/>
</p>

#### Overview

Codebase for an Electron Application built as a GUI for control of a High Voltage Power Supply designed for IEC Fusors over a LAN. The Application is capable of spinning up a separate thread running a webserver (express) via a hidden Electron window. Once running, the webserver thread hosts a RESTful API so remote devices on the local network (LAN) can communicate data to the GUI application. 

The High Voltage Power Supply Control Board houses an ESP32 WIFI Enabled Microcontroller. This MCU communicates all status data (voltages, currents, configurations, etc...) to the Electron Application by sending the appropriate HTML request over the LAN, and can receive configuration data to adjust settings in return. 

#### Goals
* Learn how to make modern & attractive cross-platform GUIs for realtime control of embedded hardware over a network. 
* Learn some modern web development technologies
* Evaluate modern web develpment technologies for realtime control applications 

#### How to install and use

1. Download NPM and install it
2. run: 
'''
npm install
'''
in the HVPSU directory (rebuilds node_modules)

3. run:
'''
npm start
'''
in the HVPSU directory (starts application)
