# pipe-op-js
Implementation of a util that works similar to |> 


### example

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

    console.log(myCoolCar)

    /* outputs
      {
        color: 'blue', 
        isCool: true,
        speak: () => 'honk',
        make: 'dmc',
        model: 'delorean'
      }
    */
    
