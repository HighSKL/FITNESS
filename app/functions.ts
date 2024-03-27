export const validator = <FieldErrorType>(regExp: RegExp, errorType: FieldErrorType, value: string, errorSet: any) => regExp.test(value) ? true : errorSet(errorType)

