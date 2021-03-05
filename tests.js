// todo get jest installed, etc

import { pipeOp } from './index.js'

describe('pipeOp', () => {
  const adder = (num, add) => num + add
  const timesTwo = num => num * 2

  it('test 1', () => {
    const eight = pipeOp(1, [adder, 3], [timesTwo])

    expect(eight).toEqual(8)
  })

  it('test 2', () => {
    const gary = {
      name: 'gary',
      age: 42,
      hair: 'blue',
    }

    const lisa = {
      name: 'lisa',
      age: 22,
      hair: 'red',
    }

    const changeHair = (user, color) => ({ ...user, hair: color })
    const findGary = users => users.find(user => user.name === 'gary')
    const users = [gary, lisa]

    // prettier-ignore
    const probablyGary = pipeOp(
      users,
      [findGary],
      [changeHair, 'green']
    )

    expect(probablyGary.name).toBe('gary')
    expect(probablyGary.hair).toBe('green')
  })

  it('can handle functions with lots of args', () => {
    const models = [
      { make: 'toyota', model: 'mr2' },
      { make: 'honda', model: 'civic' },
      { make: 'subaru', model: 'impreza' },
      { make: 'dmc', model: 'delorean' },
    ]

    const getADelorean = carModels => carModels.find(carModel => carModel.model === 'delorean')

    const carFactory = (makeAndModel, color, speak) => ({
      speak,
      model: makeAndModel.model,
      color,
      make: makeAndModel.make,
    })
    const coolify = anything => ({ ...anything, isCool: true })

    const myCoolCar = pipeOp(
      models,
      [getADelorean],
      [carFactory, 'blue', () => 'honk'],
      [coolify],
    )

    expect(myCoolCar.make).toBe('dmc')
    expect(myCoolCar.model).toBe('delorean')
    expect(myCoolCar.isCool).toBe(true)
    expect(myCoolCar.color).toBe('blue')
    expect(myCoolCar.speak()).toBe('honk')
  })
})
