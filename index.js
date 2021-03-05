export function pipeOp(initValue, ...fnTuples) {
  return fnTuples.reduce((prevValue, tuple) => {
    const [fn, ...additionalArguments] = tuple

    return fn.call ? fn(...[prevValue, ...additionalArguments]) : prevValue
  }, initValue)
}
