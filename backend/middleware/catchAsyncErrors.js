module.exports = (func) => (request, response, next) => {
  Promise.resolve(func(request, response, next)).catch(next);
};
//with this we avoid writing try and catch for every controller function
//so we pass the function to this and the resolve is the try the next is the catch
