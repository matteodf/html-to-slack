/**
 * Cleans and normalizes text, handling preformatted text differently.
 *
 * @param {string} text - The text to clean.
 * @param {boolean} [insidePre=false] - Indicates if the text is inside a preformatted tag. Defaults to false.
 * @returns {string} - The cleaned text.
 */
export function cleanText(text: string, insidePre: boolean = false): string {
  if (typeof text !== 'string') {
    console.error(
      'Expected a string for cleanText, but received:',
      typeof text
    );
    return '';
  }

  try {
    if (insidePre) {
      // Normalize line endings to \n
      text = text.replace(/\r\n?/g, '\n');
      // Split lines and find the minimum indentation level (excluding empty lines)
      const lines = text.split('\n');
      const nonEmptyLines = lines.filter((line) => line.trim() !== '');
      const minIndent = Math.min(
        ...nonEmptyLines.map((line) => line.match(/^\s*/)![0].length)
      );

      // Remove the common leading indentation from all lines
      const cleanedLines = lines.map((line) =>
        line.startsWith(' '.repeat(minIndent)) ? line.slice(minIndent) : line
      );

      return cleanedLines.join('\n');
    }
    let cleanedText = text.trim().replace(/\n[^\S\t]+/g, '\n');
    cleanedText = cleanedText.replace(/\n^\s*[•◦‣]\s*[\t]*$/gm, ''); // Remove lines that contain only bullet points and spaces/tabs
    // Remove trailing spaces from each line
    cleanedText = cleanedText
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');

    return cleanedText;
  } catch (error) {
    console.error('Error cleaning text:', error);
    return text.toString();
  }
}
