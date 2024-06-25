import convertHtmlToSlackBlocks from '../../src/index';

describe('Performance Tests', () => {
  // it('should handle large HTML input efficiently', () => {
  //     const largeHtml = '<p>Paragraph with <b>bold</b> text.</p>'.repeat(10000);

  //     const startTime = performance.now();
  //     const blocks = convertHtmlToSlackBlocks(largeHtml);
  //     const endTime = performance.now();

  //     const executionTime = endTime - startTime;

  //     // Verify that the conversion was successful
  //     expect(blocks.length).toBe(1);
  //     expect(blocks[0].elements).toEqual({
  //         type: 'rich_text_section',
  //         elements: [
  //             {
  //                 type: 'text',
  //                 text: 'Paragraph with ',
  //             },
  //             {
  //                 type: 'text',
  //                 text: 'bold',
  //                 style: {
  //                     bold: true,
  //                 },
  //             },
  //             {
  //                 type: 'text',
  //                 text: ' text.',
  //             },
  //         ],
  //     });

  //     // Ensure the execution time is within acceptable limits (e.g., less than 5 seconds)
  //     expect(executionTime).toBeLessThan(5000);
  // });

  // it('should handle deeply nested large HTML input efficiently', () => {
  //     const nestedHtml =
  //         '<div>'.repeat(10000) + 'Nested content' + '</div>'.repeat(10000);

  //     const startTime = performance.now();
  //     const blocks = convertHtmlToSlackBlocks(nestedHtml);
  //     const endTime = performance.now();

  //     const executionTime = endTime - startTime;

  //     // Verify that the conversion was successful
  //     expect(blocks.length).toBe(1);
  //     expect(blocks[0]).toEqual({
  //         type: 'section',
  //         text: {
  //             type: 'mrkdwn',
  //             text: 'Nested content',
  //         },
  //     });

  //     // Ensure the execution time is within acceptable limits (e.g., less than 5 seconds)
  //     expect(executionTime).toBeLessThan(5000);
  // });

  it('should handle large HTML input with multiple elements efficiently', () => {
    const largeHtml = `
            <html>
                <body>
                    <h1>Title</h1>
                    <p>Paragraph with <b>bold</b> text.</p>
                    <ul>
                        <li>List item 1</li>
                        <li>List item 2</li>
                        <li>List item 3</li>
                    </ul>
                </body>
            </html>
        `.repeat(1000);

    const startTime = performance.now();
    const blocks = convertHtmlToSlackBlocks(largeHtml);
    const endTime = performance.now();

    const executionTime = endTime - startTime;

    // Verify that the conversion was successful
    expect(blocks.length).toBeGreaterThan(0);

    // Ensure the execution time is within acceptable limits (e.g., less than 5 seconds)
    expect(executionTime).toBeLessThan(5000);
  });
});
