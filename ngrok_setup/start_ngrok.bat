@echo off
title M2 POS - Ngrok Tunnel
cd /d "%~dp0"
echo Starting ngrok tunnel for port 8002...
echo.
echo IMPORTANT: I-share ang URL na lalabas kay Jane at Classmate B!
echo.
echo Kung first time, i-run muna:
echo   ngrok config add-authtoken 3FhMZGF21LjnAOG9AKNWYV88hfE_2vFfU1s7dAStgHT2DGG9t
echo.
ngrok.exe http 8002
pause
