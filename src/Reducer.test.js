import reducer, {
  increment,
  decrement,
  incrementByAmount,
} from "./features/customCounter/customCounterSlice";

describe("Redducer of ReduxToolkit", () => {
  describe("increment action", () => {
    let initialState = {
      mode: 0,
      value: 1,
    };
    it("Should increment by 1 with mode 0", () => {
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(2);
    });
    it("Should increment by 100 with mode 1", () => {
      initialState = {
        mode: 1,
        value: 1,
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(101);
    });
  });
});
