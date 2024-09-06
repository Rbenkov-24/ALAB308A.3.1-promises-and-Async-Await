/**
 * synchronous (blocking): each task must finish before the next one starts
 * asynchronous (non-blocking): tasks xcan happen in the background without stopping the rest of the program (more user-friendly)
 * await: used in asynchronous functions. makes my function wait for a task to complete but the rest of my app keeps going
 * Promise is a way to handle results from tasks that take time like loading data. It can be waiting, done, or failed
 * 
 * */


// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

// getting the user data using the user id
async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
 
  // find where the user data is located in the central database
  const dbName = await central(id);
  console.log(dbName);

  // fetch basic data from db1, db2, or db3 and personal info from the vault at the same time
  const [basicInfo, personalInfo] = await Promise.all([dbs[dbName](id), vault(id)]); //pauses the function until all promises are resolved

  // combine the data and return it in the correct format
  return {
    id: id,
    username: basicInfo.username,
    website: basicInfo.website,
    company: basicInfo.company,
    name: personalInfo.name,
    email: personalInfo.email,
    address: personalInfo.address,
    phone: personalInfo.phone
  };
}

// test the function with ID 6
const user = await getUserData(6);
console.log(user);