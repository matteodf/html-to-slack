import { addTextBlock, getBlocks, handleListOpen, handleText, resetBlocks } from '../../src/handlers';

describe('Handlers Tests', () => {
    beforeEach(() => {
        resetBlocks();
    });

    describe('addTextBlock', () => {
        beforeEach(() => {
            resetBlocks();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should handle the case where currentText is a bullet point and inList is true', () => {
            // Mock cleanText to return a bullet point
            jest.spyOn(require('../../src/utils'), 'cleanText').mockImplementationOnce(() => '•');

            handleListOpen();
            handleText('•');
            addTextBlock();

            // Verify that no block was added
            const blocks = getBlocks();
            expect(blocks.length).toBe(0);
        });

        it('should add a block when currentText is not empty and not just a bullet point in a list', () => {
            handleText('Some text');
            addTextBlock();

            const blocks = getBlocks();
            expect(blocks.length).toBe(1);
            expect(blocks[0].text.text).toBe('Some text');
        });
    });
});
