#1/usr/bin/bash

newId=`m365 spo app add --filePath ../sharepoint/solution/spfx-viva-connections-extensions.sppkg --overwrite`
echo $newId
m365 spo app deploy --name spfx-viva-connections-extensions.sppkg