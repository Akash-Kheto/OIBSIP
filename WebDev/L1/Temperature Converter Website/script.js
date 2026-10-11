
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const error = document.getElementById("error");

const celsiusResult = document.getElementById("celsius");
const fahrenheitResult = document.getElementById("fahrenheit");
const kelvinResult = document.getElementById("kelvin");
const resultNote = document.getElementById("resultNote");

const ABSOLUTE_ZERO_C = -273.15;
const ABSOLUTE_ZERO_F = -459.67;

function formatTemperature(value) {
    // Avoid displaying -0.00 due to floating-point rounding.
    if (Math.abs(value) < 0.0000001) {
        value = 0;
    }

    return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false
    });
}

function convertTemperature(value, unit) {
    let celsius;

    // Convert the input to Celsius first.
    switch (unit) {
        case "C":
            celsius = value;
            break;

        case "F":
            celsius = (value - 32) * 5 / 9;
            break;

        case "K":
            celsius = value - 273.15;
            break;

        default:
            throw new Error("Please select a valid temperature unit.");
    }

    // Reject temperatures below absolute zero.
    if (celsius < ABSOLUTE_ZERO_C - 1e-10) {
        throw new Error(
            "Temperature cannot be below absolute zero (-273.15°C)."
        );
    }

    // Clamp tiny floating-point errors at absolute zero.
    celsius = Math.max(ABSOLUTE_ZERO_C, celsius);

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    return {
        celsius,
        fahrenheit,
        kelvin
    };
}

function resetResults() {
    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";
}

function showError(message) {
    error.textContent = message;
    resultNote.textContent = "Please correct the input and try again.";
    resetResults();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    error.textContent = "";

    const rawValue = temperatureInput.value.trim();

    // An empty field must not be treated as zero.
    if (rawValue === "") {
        showError("Please enter a temperature value.");
        temperatureInput.focus();
        return;
    }

    const value = Number(rawValue);

    if (!Number.isFinite(value)) {
        showError("Please enter a valid numeric temperature.");
        temperatureInput.focus();
        return;
    }

    // Validate absolute zero in the selected input unit.
    const unit = fromUnit.value;

    if (unit === "K" && value < 0) {
        showError("Kelvin cannot be negative. Absolute zero is 0 K.");
        return;
    }

    if (unit === "C" && value < ABSOLUTE_ZERO_C) {
        showError("Celsius cannot be below -273.15°C (absolute zero).");
        return;
    }

    if (unit === "F" && value < ABSOLUTE_ZERO_F) {
        showError("Fahrenheit cannot be below -459.67°F (absolute zero).");
        return;
    }

    try {
        const result = convertTemperature(value, unit);

        celsiusResult.textContent =
            formatTemperature(result.celsius) + " °C";

        fahrenheitResult.textContent =
            formatTemperature(result.fahrenheit) + " °F";

        kelvinResult.textContent =
            formatTemperature(result.kelvin) + " K";

        resultNote.textContent =
            "Successfully converted " + value + " " +
            (unit === "K" ? "K" : "°" + unit) +
            " into all three temperature scales.";

    } catch (err) {
        showError(err.message);
    }
});

// Clear old errors as the user edits the input.
temperatureInput.addEventListener("input", function () {
    error.textContent = "";
});

fromUnit.addEventListener("change", function () {
    error.textContent = "";
});