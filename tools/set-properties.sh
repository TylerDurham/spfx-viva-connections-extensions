m365 spo customaction set --url https://smartterthings.sharepoint.com/sites/dev01 --id 40b1927c-3821-46f6-88de-e5bbae4c4720  -p '{ "searchPageUrl": "/_layouts/15/search.aspx", "queryStringParameter": "q" }' -scope Web


m365 spo customaction list --url https://smartterthings.sharepoint.com/sites/dev01 --scope Web

&quot;searchPageUrl&quot;: &quot;/_layouts/15/search.aspx&quot;, &quot;queryStringParameter&quot;: &quot;q&quot;