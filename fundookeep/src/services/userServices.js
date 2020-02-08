import axios from "axios";
// const API_URL = "http://localhost:3000";

const BASE_URL = "http://localhost:3000/";

function register(data) {
  console.log("user Credential @ register", data);

  return axios(BASE_URL + "register", {
    method: "POST",
    data: data
  })
    .then(function(response) {
      const userDetails = response.data;
      console.log("details of user saved", userDetails);
      return userDetails;
    })
    .catch(function(error) {
      console.log("error while creating user", error);
    });
}

function login(data) {
  console.log("user Credential @ login ", data);

  return axios(BASE_URL + "login", {
    method: "POST",
    data: data
  })
    .then(function(response) {
      console.log("to check error", response.err);

      console.log("only response", response);
      return response;

      // if (response.status == 200) {
      //   const loginDetails = response.data;
      //   console.log(
      //     "details of the logined user{Response(login Details)}--",
      //     loginDetails
      //   );
      //   return loginDetails;
      // } else if (response.status == 240) {
      //   console.log("sdaaaaaaaaaaaa");

      //   const errorMessage = response.data.message;
      //   console.log("the error msg is ", errorMessage);
      //   return errorMessage;
      // }
    })
    .catch(function(err) {
      console.log("in catcch");
      console.log("error while login(in frontend catch)", err);

      // if (err.status == 500) {
      //   console.log("asdddddddddddddddd");
      // } else {
      //   console.log("error while login(in frontend catch)", err);
      //   // return err;
      // }
    });
}

function createNote(data) {
  console.log("notes data", data);

  return axios(BASE_URL + "createNote", {
    method: "POST",
    data: data,
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(function(response) {
      const noteResult = response.data;
      console.log("details of notes saved", noteResult);
      return noteResult;
    })
    .catch(function(error) {
      console.log("error while creating note", error);
    });
}

function getNotes() {
  return axios(BASE_URL + "getNotes", {
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .then(function(response) {
      const notes = response.data;
      console.log("got the notes", notes);
      return notes;
    })
    .catch(function(error) {
      console.log("error while getting notes", error);
    });
}

export { login, register, createNote, getNotes };
