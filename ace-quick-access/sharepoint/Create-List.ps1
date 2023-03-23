Param (
    [string] $ListName = "ST Quick Access Links",
    [switch] $Overwrite,
    [switch] $IncludeSampleContent
)

Function Get-ThumbnailJSON {
    Param(
        $Context,
        $File
    )

    [System.Uri] $uri = $Context.Url

    $obj = New-Object psobject -Property @{
        "type"              = "thumbnail"
        "fileName"          = $File.Name 
        "fieldName"         = "thumbnailURL" 
        "serverUrl"         = $uri.Scheme + "://" + $uri.Host
        "serverRelativeUrl" = $file.serverRelativeUrl
    }

    return $obj
}

$CONTEXT = Get-PnpContext
$SITE_URL = $CONTEXT.Url

[System.Console]::ResetColor()
[System.Console]::Clear()

if ( $Overwrite ) {
    Write-Host -BackgroundColor Yellow -ForegroundColor Black "'Overwrite' switch specified.. deleting list $ListName in site '$SITE_URL'."
    $x = Remove-PnPList -Identity $ListName -Force -Recycle -ErrorAction SilentlyContinue
    Write-Host "  List '$ListName' deleted.`n"
}

$LIST = Get-PnPList -Identity $ListName

if( $null -eq $LIST ) {
    Write-Host -BackgroundColor Blue -ForegroundColor Black "Creating list '$ListName' in site '$SITE_URL'"
    $LIST = New-PnPList -Title $ListName -Template GenericList
    Write-Host "  Done!`n"
} else {
    if ( $Overwrite -ne $true ) {
        Write-Host -BackgroundColor Red -ForegroundColor Black "ERROR!"
        Write-Host "`nList '$ListName' already exists in the site located in site '$SITE_URL'."
        Write-Host "`nTo continue, you will need to either "
        Write-Host "  1) Choose a new list name using the ListName switch"
        Write-Host "  2) Specify the Overwrite switch."
        Write-Host "`n"

        Exit
    }
    
}

Write-Host -BackgroundColor Blue -ForegroundColor Black "Creating fields in list."

# Description
Write-Host "  * Creating 'Description' field..."
$id = New-Guid
$xml = '<Field ID="{' + $id + '}"
        DisplayName="Description"
        Name="Description"
        Type="Note"
        Required="FALSE"
        Group="@ST Columns" 
/>'

$x = Add-PnPFieldFromXml -List $LIST -FieldXml $xml

# Action Text
Write-Host "  * Creating 'Action Text' field..."
$id = New-Guid
$xml = '<Field ID="{' + $id + '}"
        DisplayName="Action Text"
        Name="ActionText"
        Type="Text"
        Required="FALSE"
        Group="@ST Columns" 
/>'

$x = Add-PnPFieldFromXml -List $LIST -FieldXml $xml

# Action URL
Write-Host "  * Creating 'Action URL' field..."
$id = New-Guid
$xml = '
<Field ID="{' + $id + '}"
        DisplayName="Action URL"
        Format="Hyperlink"
        Name="ActionURL"
        Required="FALSE"
        Type="URL"
        Group="@ST Columns" 
/>'

$x = Add-PnPFieldFromXml -List $LIST -FieldXml $xml

# Thumbnail URL
Write-Host "  * Creating 'Thumbnail URL' field..."
$id = New-Guid
$xml = '
<Field 
	ClientSideComponentId="00000000-0000-0000-0000-000000000000"
    DisplayName="Thumbnail URL" 
	Format="Thumbnail" 
	Name="ThumbnailURL"               
	Type="Thumbnail"
	ID="{' + $id + '}" 
    Version="2" 
/>'

$x = Add-PnPFieldFromXml -List $LIST -FieldXml $xml

# Sort Order
Write-Host "  * Creating 'Sort Order' field..."
$id = New-Guid
$xml = '<Field ID="' + $id + '"
        Decimals="0"
        DisplayName="Sort Order"
        Max="100"
        Min="0"
        Name="SortOrder"
        Required="FALSE"
        Type="Number"
        Group="@ST Columns" 
/>'

$x = Add-PnPFieldFromXml -List $LIST -FieldXml $xml
Write-Host "  Done!`n"

# Add to default view
Write-Host -BackgroundColor Blue -ForegroundColor Black "Updating the default view for the list."
$view = Get-PnPView -List $LIST | Where-Object { $_.DefaultView -eq $true }
$x = Set-PnPView -List $LIST -Identity $view.Id -Fields "Title", "Description", "ActionText", "ActionURL", "ThumbnailURL", "SortOrder"
Write-Host " Done!`n"

If ( $IncludeSampleContent ) {
    
    Write-Host -BackgroundColor Blue -ForegroundColor Black "'IncludeSampleContent' switch specified... creating sample content."
    $SPO_FOLDER = "SiteAssets/Lists/" + $LIST.Id
    $THUMBNAIL_JSON = @{}
    Write-Host "`n"

    Write-Host -BackgroundColor Blue -ForegroundColor Black  "Uploading thumbnail links to the site's asset library."
    Get-ChildItem -Path "./sharepoint/assets/ace-sample-thumbnails" | ForEach-Object {
        $file = Add-PnPFile -Path $_.FullName -Folder $SPO_FOLDER
        $THUMBNAIL_JSON[$_.Name] = ( Get-ThumbnailJSON -Context $CONTEXT -File $file | ConvertTo-Json )
        Write-Output ("  * Uploaded " + $file.Name + " to " + $SPO_FOLDER + "!" )
    }
    Write-Host "  Done! `n"

    Write-Host -BackgroundColor Blue -ForegroundColor Black "Creating sample Quick Access Links..."
    Write-Output "  * Creating a sample Quick Access Link for Entering Time..."
    $x = Add-PnPListItem -List $LIST -Values @{ 
        "Title"        = "Enter Time"; 
        Description    = "Enter project time for billing."; 
        "ActionText"   = "Enter Here"; 
        "ActionURL"    = "https://www.kronos.com, https://www.kronos.com"; 
        "ThumbnailURL" = $THUMBNAIL_JSON["ace-sample-time-entry.png"];
        "SortOrder"    = 1000
    }

    Write-Output "  * Creating a sample Quick Access Link for Entering Time Off..."
    $x = $x = Add-PnPListItem -List $LIST -Values @{ 
        "Title"        = "Apply for Time Off"; 
        Description    = "Manage your absence."; 
        "ActionText"   = "Apply Here"; 
        "ActionURL"    = "https://www.workday.com, https://www.workday.com"; 
        "ThumbnailURL" = $THUMBNAIL_JSON["ace-sample-vacation.png"];
        "SortOrder"    = 0
    }

    Write-Output "  * Creating a sample Quick Access Link for Entering Expenses..."
    $x = Add-PnPListItem -List $LIST -Values @{ 
        "Title"        = "Raise an Expense Claim"; 
        Description    = "Reimburse your expenses here.";
        "ActionText"   = "Click Here"; 
        "ActionURL"    = "https://www.workday.com, https://www.workday.com"; 
        "ThumbnailURL" = $THUMBNAIL_JSON["ace-sample-expense.png"];
        "SortOrder"    = 0
    }

    Write-Output "  * Creating a sample Quick Access Link for Sending Praise..."
    $x = Add-PnPListItem -List $LIST -Values @{ 
        "Title"        = "Rave about Someone"; 
        Description    = "Send feedback and make somebody happy!";
        "ActionText"   = "Click Here"; 
        "ActionURL"    = "https://www.microsoft.com, https://www.microsoft.com"; 
        "ThumbnailURL" = $THUMBNAIL_JSON["ace-sample-praise.png"];
        "SortOrder"    = 0
    }

    Write-Host "  Done!`n"
}

Write-Host -NoNewline -BackgroundColor Green -ForegroundColor Black "All tasks completed... enjoy!"
[System.Console]::ResetColor()
Write-Output  "..."

