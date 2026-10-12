
const tempSlider = document.getElementById('temp');

const humiditySlider = document.getElementById('humidity');

function updateHeatIndex() {

    const T = Number(tempSlider.value);

    const R = Number(humiditySlider.value);

    document.getElementById('tempValue').textContent = T + '°F';

    document.getElementById('humidityValue').textContent = R + '%';

    let simple = 0.5 * (
        T + 61 + ((T - 68) * 1.2) + (R * 0.094)
    );

    let average = (simple + T) / 2;

    let heat = average;

    if (average >= 80) {

        heat = -42.379
            + 2.04901523 * T
            + 10.14333127 * R
            - 0.22475541 * T * R
            - 0.00683783 * T * T
            - 0.05481717 * R * R
            + 0.00122874 * T * T * R
            + 0.00085282 * T * R * R
            - 0.00000199 * T * T * R * R;

        if (R < 13 && T >= 80 && T <= 112) {

            heat -= ((13 - R) / 4)
                * Math.sqrt(
                    (17 - Math.abs(T - 95)) / 17
                );

        }

        if (R > 85 && T >= 80 && T <= 87) {

            heat += ((R - 85) / 10)
                * ((87 - T) / 5);

        }

    }

    heat = Math.round(heat);

    let level;
    let advice;
    let color;

    if (heat >= 125) {

        level = 'Extreme Danger';

        advice = 'Avoid outdoor exertion. Seek a cool place and monitor for signs of heat illness.';

        color = '#ffd2d2';

    } else if (heat >= 103) {

        level = 'Danger';

        advice = 'Limit outdoor activity, take frequent cooling breaks, and watch for heat illness symptoms.';

        color = '#ffd7c0';

    } else if (heat >= 90) {

        level = 'Extreme Caution';

        advice = 'Take extra breaks, drink water, and reduce prolonged outdoor activity.';

        color = '#ffe4ae';

    } else if (heat >= 80) {

        level = 'Caution';

        advice = 'Stay hydrated and pay attention to how you feel during outdoor activities.';

        color = '#f5e8ae';

    } else {

        level = 'Lower Risk';

        advice = 'Continue basic heat precautions, especially during physical activity.';

        color = '#d2f2de';

    }

    document.getElementById('heatIndex').textContent = heat + '°F';

    const badge = document.getElementById('riskLevel');

    badge.textContent = level;

    badge.style.background = color;

    badge.style.color = '#342f2a';

    document.getElementById('riskAdvice').textContent = advice;

}

tempSlider.addEventListener('input', updateHeatIndex);

humiditySlider.addEventListener('input', updateHeatIndex);

updateHeatIndex();