# Public Data Directory

## Candidate Data

Place your `candidates.csv` file here with the following structure:

```csv
CandidateID,FullName,BallotName,ElectoralDistrict,Sex,DataQuality,LastUpdated
259,Abdullah Karim Al-Khazaali,National Depth Alliance,Baghdad,Male,OK,2025-10-15 12:07:35
```

### File Location
Copy your cleaned candidate file to: `public/candidates.csv`

From Windows PowerShell:
```powershell
Copy-Item -Path "E:\HamletUnified\full_consolidation\candidates\master\CLEANED_CANDIDATES_20251015_120734.csv" -Destination "E:\HamletUnified\Copy-of-Hamlet-social\public\candidates.csv" -Force
```
