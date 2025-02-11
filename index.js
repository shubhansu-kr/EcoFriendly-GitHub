async function updateReadme() {
    const fs = require('fs');

    let readme = " \r\n";

    try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        readme = `Quote on |${new Date().toUTCString()}| : `;

        if (response.ok && Array.isArray(data) && data.length > 0) {
            readme += ` ${data[0]["q"]} - ${data[0]["a"]}`;
        } else {
            throw new Error('response not OK');
        }
    } catch (e) {
        readme += `Fetching failed`;
    }

    readme += "\r\n";

    fs.writeFile('quotes.txt', readme, { 'flag': 'a' }, function (err) {
        if (err) {
            return console.error(err);
        }
    });

}

updateReadme();
