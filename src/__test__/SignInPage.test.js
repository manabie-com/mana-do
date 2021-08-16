import Service from "../service";

it("Testing SignIn Function", async function () {
  const data = await Service.signIn('firstUser', 'example');
  expect(data.username).toEqual("firstUser");
});

