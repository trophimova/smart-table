import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.keys(indexes)
      .forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
            .map(name => {
                const optionElement = document.createElement("option");
                optionElement.value = name;
                optionElement.textContent = name;
                return optionElement;
            })
        )
     })

    return (data, state, action) => {
        if (action && action.name === "clear") {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector("input, select");
            input.value = "";
            state[field] = "";
        }

        return data.filter(row => compare(row, state));
    }
}