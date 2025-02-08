type TokenType = "integer" | "plus" | "eof";

class Token {
  constructor(
    public type: TokenType,
    public value: string,
  ) {}

  toString(): string {
    return `Token(${this.type}, ${this.value})`;
  }
}

export class Calculator {
  private currentToken: Token | null = null;
  private pos = 0;

  constructor(private text: string) {}

  private getNextToken(): Token | null {
    if (this.pos >= this.text.length) {
      return new Token("eof", "");
    }
    const currentChar = this.text[this.pos];
    if (/\d/.test(currentChar)) {
      const token = new Token("integer", currentChar);
      this.pos += 1;
      return token;
    }
    if (currentChar === "+") {
      const token = new Token("plus", currentChar);
      this.pos += 1;
      return token;
    }
    throw new Error("Invalid character");
  }

  private eat(tokenType: TokenType): void {
    if (this.currentToken?.type === tokenType) {
      this.currentToken = this.getNextToken();
    } else {
      throw new Error("Invalid syntax");
    }
  }

  public expr(): number {
    this.currentToken = this.getNextToken();
    const left = this.currentToken;
    this.eat("integer");
    const _op = this.currentToken;
    this.eat("plus");
    const right = this.currentToken;
    this.eat("integer");
    return parseInt(left!.value) + parseInt(right!.value);
  }
}
