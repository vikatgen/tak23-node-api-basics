let cars = [];

// GET /cars
export const getAllCars = (request, response) => {
    response.status(200).json(cars);
};

// GET /cars/:id
export const getCarById = (request, response) => {
    const { id } = request.params;
    // Loop through array and find the item with same id as params.
    // Using filter is returning [] when no matches found
    const car = cars.filter((car) => car.id === id);

    // Error handling, if there is no car with this id in the cars array
    // Because filter is returning empty [] we need to check the car length
    if (!car.length) {
        response.status(404).json({
            message: "Car not found",
        });
    }

    // Car is found, send it back with response body
    response.status(200).json(car);
};

// POST /cars
export const createCar = (request, response) => {
    console.log(request);
    const { model, series, year } = request.body;

    const id = cars.length > 0 ? cars.length + 1 : 1;

    cars.push({
        id,
        model,
        series,
        year,
    });

    response.status(201).json({
        message: "Car added successfully.",
    });
};
