export const mockedData = Array(20)
  .fill("")
  .map((_, index) => {
    const id = index + 1;

    return {
      id,
      name: `Product ${id}`,
    };
  });
