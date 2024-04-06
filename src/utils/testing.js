/**
 * @fileoverview Testing utilities
 */

/**
 * @class
 * @classdesc Auto-generate a item's spoken content wrapper
 */
export class spokenItemWrapper {
  constructor(expected) {
    this.expected = expected;
  }
  spokenWrapper = (textArr, wrapper) => {
    const arr = [wrapper];
    textArr.forEach(text => arr.push(text?.toString()));
    arr.push(`end of ${wrapper}`);
    return arr;
  }

  /**
   * Add spoken content for a term and its definition
   * @param {string} term - The content of the <dt>
   * @param {string} definition - The content of the <dd>
   */
  spoken(text, wrapper) {
    let content = text;
    content = Array.isArray(content) ? content : [text];
    this.spokenWrapper(content, wrapper).forEach((phrase) => this.expected.push(phrase));
  }
}

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
