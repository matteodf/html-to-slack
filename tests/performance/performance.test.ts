import convertHtmlToSlackBlocks from '../../src/index';
import { linearizeLists } from '../../src/utils';

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
  it('should handle nested lists efficiently', () => {
    const largeHtml =
      `<ul>` +
      `<li>Item 1
            <ul>
                <li>Subitem 1.1
                    <ul>
                        <li>Subitem 1.1.1
                            <ul>
                                <li>Subitem 1.1.1.1</li>
                                <li>Subitem 1.1.1.2
                                    <ul>
                                        <li>Subitem 1.1.1.2.1</li>
                                        <li>Subitem 1.1.1.2.2
                                            <ul>
                                                <li>Subitem 1.1.1.2.2.1</li>
                                                <li>Subitem 1.1.1.2.2.2</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>Subitem 1.1.2</li>
                    </ul>
                </li>
                <li>Subitem 1.2</li>
            </ul>
        </li>
        <li>Item 2
            <ol>
                <li>Subitem 2.1
                    <ol>
                        <li>Subitem 2.1.1
                            <ol>
                                <li>Subitem 2.1.1.1</li>
                                <li>Subitem 2.1.1.2</li>
                            </ol>
                        </li>
                        <li>Subitem 2.1.2</li>
                    </ol>
                </li>
                <li>Subitem 2.2</li>
            </ol>
        </li>
        <li>Item 3
            <ul>
                <li>Subitem 3.1
                    <ul>
                        <li>Subitem 3.1.1</li>
                        <li>Subitem 3.1.2</li>
                    </ul>
                </li>
                <li>Subitem 3.2</li>
            </ul>
        </li>
        <li>Item 4
            <ol>
                <li>Subitem 4.1
                    <ol>
                        <li>Subitem 4.1.1</li>
                        <li>Subitem 4.1.2</li>
                    </ol>
                </li>
                <li>Subitem 4.2</li>
            </ol>
        </li>
        <li>Item 5
            <ul>
                <li>Subitem 5.1
                    <ul>
                        <li>Subitem 5.1.1</li>
                        <li>Subitem 5.1.2</li>
                    </ul>
                </li>
                <li>Subitem 5.2</li>
            </ul>
        </li>`.repeat(10000) +
      `
    </ul>
        `;

    const startTime = performance.now();
    const blocks = linearizeLists(largeHtml);
    const endTime = performance.now();

    const executionTime = endTime - startTime;

    console.log(executionTime);

    // Verify that the conversion was successful
    expect(blocks.length).toBeGreaterThan(0);

    // Ensure the execution time is within acceptable limits (e.g., less than 5 seconds)
    expect(executionTime).toBeLessThan(5000);
  });
});
