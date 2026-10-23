@echo off
chcp 65001 >nul
title Nam Hoc Vui
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Can cai Node.js 22.18+ hoac 24 LTS de mo ung dung.
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Dang cai cac thu vien can thiet...
  call npm.cmd install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Giu cua so nay mo khi hoc. Nhan Ctrl+C de tat.
call npm.cmd run dev -- --open
if errorlevel 1 (
  echo Neu cong 5173 da duoc su dung, ung dung co the dang chay.
  echo Mo http://127.0.0.1:5173/ trong trinh duyet.
  pause
)
