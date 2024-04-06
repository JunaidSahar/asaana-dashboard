export function separateTextAndCode(inputString) {
    // Match all code blocks
    const codeRegex = /````(\w+)\n([\s\S]+?)````/g;

    let matches;
    let separated = [];
    let lastIndex = 0;

    // Iterate over all matches
    while ((matches = codeRegex.exec(inputString)) !== null) {
        // Extract the text between the previous match and the current match
        const textBeforeCode = inputString.substring(lastIndex, matches.index);
        separated.push({
            content: textBeforeCode.trim(),
            type: "text",
        });

        // Extract the code block
        // const code = "````" + matches[1] + "\n" + matches[2] + "````";
        separated.push({
            language: matches[1],
            content: matches[2],
            type: "code",
        });

        lastIndex = matches.index + matches[0].length;
    }

    // Push the remaining text after the last code block
    separated.push({
        content: inputString.substring(lastIndex).trim(),
        type: "text",
    });

    // Remove empty strings
    separated = separated.filter(item => item !== "");

    return separated;
}

