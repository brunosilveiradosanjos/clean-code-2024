export default interface Http {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(method: string, url: string, fn: any): Promise<void>
  listen(port: number): Promise<void>
}
