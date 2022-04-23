const { exec } = require('child_process')
const APP_ID = "b9ca6d82-de7d-4eba-adc8-e50f36952d37"

const siteUrl = process.argv[2];

if(siteUrl !== undefined) {
    const urls = siteUrl.split(",")
    
    for(let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(`Uninstalling app "${APP_ID}" from site "${url}."`);
        const cmd = `m365 spo app uninstall --id ${APP_ID} --siteUrl ${url} --confirm`
        execute(cmd);
    }

} else {
    console.warn(`Please specify the site URL.`);
}

function execute(cmd) {
    exec(cmd, (err, stdout, stderr) => {
        if (err || stderr) {
            console.error((err) ? err : stderr); return;
        } else {
            console.log(stdout); return;
        }
    });
}