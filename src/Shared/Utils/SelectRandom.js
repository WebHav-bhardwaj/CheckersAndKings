import React from "react";

export default function SelectRandom({string1, string2}) {
  const randomNumber = Math.random();

  // If the random number is less than 0.5, return the first string; otherwise, return the second string
  if (randomNumber < 0.5) {
    return string1;
  } else {
    return string2;
  }
}
