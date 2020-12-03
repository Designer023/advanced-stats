/**
 * Calculates an Eddington number - That where the hightest number of times that a distance has been covered an equal number of times
 * eg running 21km 21 times would give an E of 21
 * Takes an array of counts for each distance and returns the E number
 * [0, 5, 5, 5, 4, 2] returns 4 because 4 has been covered 4 times.
 * https://en.wikipedia.org/wiki/Arthur_Eddington#Eddington_number_for_cycling
 * @param data {array} [n, n, n, n]
 * @returns {number}
 */
const eddingtonValue = (data) => {
    return data.filter((n, i) => n >= i && i !== 0).length;
};

export default eddingtonValue;
