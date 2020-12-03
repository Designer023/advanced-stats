import eddingtonValue from "./index";

it("renders without crashing", () => {
    expect(eddingtonValue([0])).toEqual(0);
    expect(eddingtonValue([0, 1])).toEqual(1);

    expect(eddingtonValue([0, 1, 1, 1, 1, 1])).toEqual(1);

    expect(eddingtonValue([0, 2, 2, 2, 2, 2])).toEqual(2);
    expect(eddingtonValue([0, 3, 3, 2, 2, 2])).toEqual(2);
    expect(eddingtonValue([0, 4, 4, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toEqual(3);
    expect(eddingtonValue([0, 270, 268, 264, 243, 228, 179, 166, 135, 123, 116, 85, 74, 58, 52, 46, 39, 35, 34, 31, 29, 28, 18, 16, 13, 10, 9, 9, 6, 6, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])).toEqual(21);
});
