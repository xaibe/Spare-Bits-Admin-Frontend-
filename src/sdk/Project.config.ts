export class ProjectConfig {
  private static path = 'https://sparebits.herokuapp.com';//http://localhost:3000';

  public static getPath(): string {
    return ProjectConfig.path;
  }
}
