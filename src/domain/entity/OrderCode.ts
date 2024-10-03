export default class OrderCode {
  public value: string

  constructor(issueDate: Date, sequence: number) {
    const convertedSequence: string = `${sequence}`.padStart(8, '0')
    this.value = `${issueDate.getFullYear()}${convertedSequence}`
  }
}
