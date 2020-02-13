import { Subject } from "rxjs";

import axios from "axios";

const API_URL = "http://localhost:3000/";

const subject = new Subject();

// export default {
//   sendMessage: message => subject.next({ text: message }),
//   getMessage: () => subject.asObservable()
// };

export default {
  sendMessage: message => subject.next({ text: message }),
  getMessage: () => subject.asObservable(),

  updateColor(data) {
    console.log("cardColor", data.color);
    console.log("cardId", data.noteID);

    return axios(API_URL + "updateColor", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(function(response) {
        const updatedColor = response.data;
        console.log("Response Card's Color updated", updatedColor);
        return updatedColor;
      })
      .catch(function(error) {
        console.log("error while updating color of the card", error);
      });
  },

  archiveNote(data) {
    console.log("in service", data);

    return axios(API_URL + "isArchived", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const archivedData = res.data;
        console.log("Response Card's Archive update", archivedData);
        return archivedData;
      })
      .catch(error => {
        console.log("error while updating archive of the card ", error);
      });
  },

  // deleteNote(data) {
  //   console.log("In service(trash details)", data);

  //   return axios(API_URL + "isTrashed", {
  //     method: "PUT",
  //     headers: {
  //       token: localStorage.getItem("token")
  //     },
  //     data: data
  //   })
  //     .then(res => {
  //       const trashedData = res.data;
  //       console.log("Response Card's Trash Restore update", trashedData);
  //       return trashedData;
  //     })
  //     .catch(error => {
  //       console.log("error while updating Trash of the card ", error);
  //     });
  // },

  deleteNoteTemp(data) {
    console.log("In service(deleteTemp details)", data);

    return axios(API_URL + "deleteTemp", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const trashedData = res.data;
        console.log("Response Card's deleteTemp  update", trashedData);
        return trashedData;
      })
      .catch(error => {
        console.log("error while updating deleteTemp of the card ", error);
      });
  },

  restore(data) {
    console.log("In service(restore details)", data);

    return axios(API_URL + "restore", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const restoredData = res.data;
        console.log("Response Card's Restore update", restoredData);
        return restoredData;
      })
      .catch(error => {
        console.log("error while restore of the card ", error);
      });
  },

  deleteForever(data) {
    console.log("In service(deleteForver details)", data);

    return axios(API_URL + "deleteNote", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const deletedDetails = res.data;
        console.log(
          "Response Card's DeleteForever update( goes to note-display.js) ",
          deletedDetails
        );
        return deletedDetails;
      })
      .catch(error => {
        console.log("error while updating deletion of the card ", error);
      });
  },

  pinCard(data) {
    console.log("In service(pinn card details)", data);

    return axios(API_URL + "pinCard", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const deletedDetails = res.data;
        console.log(
          "Response Card's pinnedCard update( goes to note-display.js) ",
          deletedDetails
        );
        return deletedDetails;
      })
      .catch(error => {
        console.log("error while updating pinning of the card ", error);
      });
  },

  updateNote(data) {
    console.log("In service(update card details)", data);

    return axios(API_URL + "editTitle", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const updatedDetails = res.data;
        console.log(
          "Response Card's updatedCard update( goes to note-display.js) ",
          updatedDetails
        );
        return updatedDetails;
      })
      .catch(error => {
        console.log("error while updating pinning of the card ", error);
      });
  },

  createLabel(data) {
    console.log("In service(create label details)", data);

    return axios(API_URL + "createLabel", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const createdlabel = res.data;
        console.log(
          "Response Card's created label update( goes to note-display.js) ",
          createdlabel
        );
        return createdlabel;
      })
      .catch(error => {
        console.log("error while creating label of the card ", error);
      });
  },

  getLabel() {
    console.log("In service(get label details)");

    return axios(API_URL + "getLabel", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(res => {
        const getLabelDetails = res.data;
        console.log(
          "Response Card's getlabel update( should go to iconlist ) ",
          getLabelDetails
        );
        return getLabelDetails;
      })
      .catch(error => {
        console.log("error while getting label of the card ", error);
      });
  },

  deleteLabel(data) {
    console.log("In service(delete label details)");

    return axios(API_URL + "deleteLabel", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const deletedDetails = res.data;
        console.log(
          "Response Card's deletedlabel update( goes to note-display.js) ",
          deletedDetails
        );
        return deletedDetails;
      })
      .catch(error => {
        console.log("error while deleting label of the card ", error);
      });
  },

  editLabel(data) {
    console.log("In service(delete label details)");

    return axios(API_URL + "editLabel", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const editLabelDetails = res.data;
        console.log(
          "Response Card's editLabel update( goes to note-display.js) ",
          editLabelDetails
        );
        return editLabelDetails;
      })
      .catch(error => {
        console.log("error while editing label of the card ", error);
      });
  },

  addLabel(data) {
    console.log("In service(adding label details)", data);

    return axios(API_URL + "saveLabel", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        const createdlabel = res.data;
        console.log(
          "Response Card's added label to note update( goes to icon list.js) ",
          createdlabel
        );
        return createdlabel;
      })
      .catch(error => {
        console.log("error while adding label to note of the card ", error);
      });
  }
};
