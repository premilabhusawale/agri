import React from 'react'

const nothing = () => {
    const Name = "sakshi";
  const age = 20;

  const isonline = true;
  console.log(isonline);
  const user = null;
  console.log(user);

  let city = "Pune";

  const arr = [45, 67, 78];
  console.log(arr);

  const User = [
    {
      Name: "sakshi",
      age: 20,
      city: "mumbai"
    },
    {
      Name: "riya",
      age: 22,
      city: "delhi"
    },
    {
      Name: "priya",
      age: 25,
      city: "pune"
    },
  ];
  console.log(User)

  const multiply = () => {
    console.log("hello")
  }
  multiply()


  let a = 10;
  let b = 30;
  let c = a + b;
 
  return (
    <h1>
        string = {Name}, Number = {age}, addition = {c}, City = {city}
      </h1>
  )
}

export default nothing