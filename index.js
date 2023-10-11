async function updateReadme() {
    const fs = require('fs')
    let prevData = "";

    fs.readFile('quotes.txt', (err, data) => {
        if (err) throw err;
        prevData += data.toString();
        // console.log(data.toString());
    });

    // fetch("https://api.quotable.io/random").then((v) => {

    // }).catch((e) => {

    // }).then(() => {});

    let data = {};
    try {

        const response = await fetch("https://api.quotable.io/random");
        data = await response.json();
    } catch (e) {
        console.log(e);
        return;
    }

    let readme = `Quote on ${new Date().toUTCString()}: `;

    if (response.ok) {
        readme += ` ${data["content"]} - ${data["author"]}`;
    } else {
        readme += `Fetching failed`;
    }

    prevData += "\n";
    prevData += readme;

    console.log(prevData);
}

updateReadme();