# Check python version
$pyV = python -V
if (!($pyV -match '3\.11\.*')) {
    Write-Host "Please install Python 3.11 from https://www.python.org/ before running this script. Be sure to restart VS Code (to refresh env variables) before rerunning."
    Exit
}

# Ensure script is running from root directory
$CWD = Get-Location
if ($PSScriptRoot -ne $CWD) {
    Set-Location $PSScriptRoot
}

# Set up backend-end environment
Write-Host "Setting up Python environment..."
Set-Location .\backend\
if (!(Test-Path -Path ".\.venv")) {
    python -m venv .venv
}
.\.venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r .\requirements.txt

Write-Host "Done.
If using VS Code, reload window by pressing CRTL-Shift-P and typing 'reload window' to complete setup.
If VS Code does not select the venv as the python interpreter, you will have to do it manually:
    Open the command pallet with CTRL-SHIFT-P and type 'Python: Select Interpreter'
    Select python.exe within .venv -> Scripts"