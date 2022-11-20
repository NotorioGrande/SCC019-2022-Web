function delay(){
  return new Promise(function(resolve) {
      setTimeout(resolve, 100);
  });
}