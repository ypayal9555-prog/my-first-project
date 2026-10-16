@echo off
title Gemini Watermark Remover Local Server
cd /d "%~dp0"
echo Starting exact local copy of Gemini Watermark Remover...
start "" http://localhost:8000
python -m http.server 8000
