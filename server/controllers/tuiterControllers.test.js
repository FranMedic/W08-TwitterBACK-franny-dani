const Tuit = require("../../database/models/tuit");
const { getTuits } = require("./tuiterControllers");

jest.mock("../../database/models/tuit");

describe("Given a getTuits function", () => {
  describe("When it receives an object res", () => {
    test("then it should invoke the method json ", async () => {
      const fakeTuits = [
        {
          text: "oleolehh lo caracoleehh",
          likes: 7,
          date: "2021-11-17T18:40:55.096Z",
          id: "61954cb7c24554beef209bc0",
        },
        {
          text: "Estamos probando un poquito como va esto",
          likes: 60000003,
          date: "2021-11-17T18:47:14.694Z",
          id: "61954e67604295c02c6b3095",
        },
      ];
      Tuit.find = jest.fn().mockResolvedValue(fakeTuits);
      const res = {
        json: jest.fn(),
      };

      await getTuits(null, res);

      expect(Tuit.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(fakeTuits);
    });
  });
});
