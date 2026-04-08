$root = "c:\Users\Ash\OneDrive\Desktop\MINE-HR\frontend\src\pages"
$files = Get-ChildItem -Path $root -Recurse -Filter "*.tsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace '\.\./\.\./\.\./components/PageTitle', '../../components/PageTitle'
    if ($content -ne $newContent) {
        Set-Content $file.FullName $newContent -NoNewline
        Write-Host "Fixed: $($file.FullName)"
    }
}
Write-Host "Done."
