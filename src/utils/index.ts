export const dataHasChanged = <T extends Object>(oldData: T, data:T) => {
  return JSON.stringify(oldData) !== JSON.stringify(data)
}
