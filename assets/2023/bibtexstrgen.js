const generateButton = document.getElementById('generate-button');
const outputField = document.getElementById('output-field');

generateButton.addEventListener('click', function () {
    const bibtexInput = document.getElementById('bibtex-input').value;

    // Extract relevant information from the BibTex context
    const authorRegex = /author\s*=\s*{([^,]+),.*/;
    const authorMatch = bibtexInput.match(authorRegex);
    let authorLastName = "";
    if (authorMatch) {
        const authorParts = authorMatch[1].split(" and ");
        authorLastName = authorParts[0].split(" ")[authorParts[0].split(" ").length - 1].trim();
    }

    console.log(authorLastName);

    const yearRegex = /year\s*=\s*{(\d{4})}/;
    const yearMatch = bibtexInput.match(yearRegex);
    let year = "";
    if (yearMatch) {
        year = yearMatch[1];
    }

    const journalRegex = /journal\s*=\s*{(.*)},.*/;
    const journalMatch = bibtexInput.match(journalRegex);

    console.log(journalMatch[1]);

    let journalShortcut = "";
    if (journalMatch) {
        const journalTitleWords = journalMatch[1].trim().split(/\s+/);
        for (const word of journalTitleWords) {
            journalShortcut += word.substr(0, 3).toUpperCase(); // Extract first letter of each word
        }
    }


    const titleRegex = /title\s*=\s*{(.*)/;
    const titleMatch = bibtexInput.match(titleRegex);
    let title = "";
    if (titleMatch) {
        title = titleMatch[1].replace(/,/g, "."); // Replace commas with periods
    }
    const titleWords = title.split(/\W+/);

    const finalTitle = titleWords.join("."); // Join words with periods

    // Generate the output string
    const outputString = `${authorLastName}${year}.${journalShortcut}.${finalTitle}`;

    // Update the output field
    outputField.textContent = outputString;
});