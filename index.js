async function updateReadme() {
    const fs=require('fs');
    let prevData = fs.readFileSync("./quotes.txt",{encoding:"utf-8",flag:'r'});
    let readme ="";
    
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        readme = `Quote on ${new Date().toUTCString()}: `;
    
        if (response.ok) {
            readme += ` ${data["content"]} - ${data["author"]}`;
        } else {
            throw new Error('response not OK');
        }
    } catch (e) {
        readme += `Fetching failed`;
    }
    
    prevData += "\n";
    prevData += readme;
    
    console.log(prevData);

}

updateReadme();