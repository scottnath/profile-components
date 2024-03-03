/**
 * @fileoverview Testing utilities
 */

/**
 * @class
 * @classdesc Auto-generate a description-list item's spoken content
 */
export class spokenDLItem {
  constructor(expected) {
    this.expected = expected;
  }
  spokenDtWrapper = (text) => ['term', text?.toString(), 'end of term'];
  spokenDdWrapper = (text) => ['definition', text?.toString(), 'end of definition'];

  /**
   * Add spoken content for a term and its definition
   * @param {string} term - The content of the <dt>
   * @param {string} definition - The content of the <dd>
   */
  spoken(term, definition) {
    this.spokenDtWrapper(term).forEach((phrase) => this.expected.push(phrase));
    this.spokenDdWrapper(definition).forEach((phrase) => this.expected.push(phrase));
  }
}
