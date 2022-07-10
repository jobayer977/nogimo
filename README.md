
![image info](https://raw.githubusercontent.com/jobayer977/nogimo/main/docs/nogimo-logo.png)
 
  

## Installation  

To install run the following script from the root of your project's directory:

Using Npm
```
npm install nogimo 
```
Useing Yarn
```
yarn add nogimo 
```
  

# Tossify

  

**Description**: Rxjs Based  State Management toolkit.

Nogimo is a state management pattern, created on top of RxJS, Which maintains simplicity APIs too sync with localstorage.

**Example**
```
import { Nogimo } from "nogimo";

const store = new Nogimo(null, "storageKey");
// Get the state
const currentValues = store.getValue();
// Get the observable
const obs = store.get();
// Set the state
store.set({
  name: "John",
  age: 30,
});
// Update the state
store.update((state) => {
  state.name = "John";
  state.age = 30;
  return state;
});
// Patch the state
store.patch({
  name: "John",
  age: 30,
});
// Reset the state
store.reset();
// Clear the state
store.clear();

```
  
  

## Dependencies

  ```
"rxjs":  "^7.5.5",
"typescript":  "^4.7.4"
  ```

 

  

## Configuration

```
// 1st Param accept initial Values.
// 2nd Param accept localStorage Key.
const store = new Nogimo(null, "storageKey");
```

## Exmaple

[Svelte  Example  ](https://github.com/jobayer977/nogimo/tree/main/examples/svelte)
  
## Credits

[@jahir9991](https://github.com/jahir9991)
  



 



  
