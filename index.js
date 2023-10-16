async function updateReadme() {
    const fs = require('fs');

    let readme = "\r\n";

    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        readme = `Quote on |${new Date().toUTCString()}| : `;

        if (response.ok) {
            readme += ` ${data["content"]} - ${data["author"]}`;
        } else {
            throw new Error('response not OK');
        }
    } catch (e) {
        readme += `Fetching failed`;
    }

    fs.writeFile('quotes.txt', readme, { 'flag': 'a' }, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

updateReadme();