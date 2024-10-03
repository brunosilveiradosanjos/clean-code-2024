export default interface Database {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  many(query: string, parameters: any): any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  one(query: string, parameters: any): any
}
