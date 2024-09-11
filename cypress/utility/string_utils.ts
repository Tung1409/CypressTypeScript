export class StringUtils {
  static getFormattedDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
  }

  static createRandomUsername(): string {
    const dateTime = this.getFormattedDateTime();
    return `tungcao_${dateTime}`;
  }

  static createRandomTitle(): string {
    const dateTime = this.getFormattedDateTime();
    return `Automation Title_${dateTime}`;
  }

  static createImagePath(authorName: string, imageId: string): string {
    const formattedAuthorName = authorName.toLowerCase().replace(/\s+/g, '-');
    const imagePath = `${formattedAuthorName}-${imageId}-unsplash.jpg`;
    cy.log('Generated image path: ' + imagePath);
    return imagePath;
  }
}
