const maxCaracters = /^.{0,35}$/;
const maxcaractersDescription = /^.{0,500}$/;
const allowDifficulty = /^[1-5]$/;
const onlyNumbers = /^(?:[1-9]\d?|1[0-5]\d|16[0-7])(?:\.\d+)?$/;

export default function validation(inputs) {
    var errors = {};
  if (!inputs.name) {
    errors.name = "A name is required";
  }
  if (!inputs.description) {
    errors.description = "A description is required";
  }
  if (!inputs.dificulty) {
    errors.dificulty = "A dificulty is required";
  }
  if (!inputs.duration) {
    errors.duration = "A duration is required";
  }   
  if (!inputs.season) {
    errors.season = "A season is required";
  } 
  
  if (inputs.countryId.length===0) {
    errors.countryId = "At least one country is required";
  }
  if (!maxCaracters.test(inputs.name)) {
    errors.name = "The name of the activity cannot be longer than 35 characters";
  } 
  if (!maxcaractersDescription.test(inputs.description)) {
    errors.description = "The description cannot be longer than 500 characters";
  }   
  if (!allowDifficulty.test(inputs.dificulty)) {
    errors.dificulty = "Difficulty must be betwenn 1 and 5 ";
  }
  if (!onlyNumbers.test(inputs.duration)) {
    errors.duration = "The duration must be greater than 0 and up to 168";
  }
  return errors;

}
