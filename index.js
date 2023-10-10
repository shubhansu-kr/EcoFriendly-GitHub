async function updateReadme() {
    const fs = require('fs')
    let prevData = "";

    fs.readFile('README.md', (err, data) => {
        if (err) throw err;
        prevData += data.toString();
        // console.log(data.toString());
    });

    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    let readme = `Updated on ${new Date().toUTCString()}: `;

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