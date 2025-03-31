export interface ErrorLike {
  message: string;
  code?: string;
  status?: number;
}

export const isError = (error: unknown): error is ErrorLike => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};
