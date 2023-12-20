export type Paginated<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T
}

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}
