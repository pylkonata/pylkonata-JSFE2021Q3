import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export function createSlider(element, min, max, rangeArr) {
  if (element) {
    noUiSlider.create(element, {
      start: [min, max],
      connect: true,
      step: 1,
      range: {
        'min': min,
        'max': max
      }
    });
    element.noUiSlider.on('update', function (values, handle) {
      rangeArr[handle].value = Math.round(values[handle]);
    });
  }
}