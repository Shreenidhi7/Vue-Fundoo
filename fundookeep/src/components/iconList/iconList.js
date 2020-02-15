import noteService from "../../services/noteServices";

// import parse from "date-fns/parse";
// import format from "date-fns/format";
// import isValid from "date-fns/isValid";

import parse from "date-fns/parse";
import format from "date-fns/format";
import isValid from "date-fns/isValid";

export default {
  name: "icon-list",
  components: {},
  props: {
    notecard: {
      type: Object
    },
    more: {
      type: String
    }
  },
  data() {
    // let dateFormat = this.$materail.locale.dateFormat || "yyyy-MM-dd";
    // let now = new Date();
    let dateFormat = this.$material.locale.dateFormat || "yyyy-MM-dd";
    let now = new Date();

    return {
      colorArray: [
        [
          { color: "#FFFFFF", name: "White" },
          { color: "#F28B82", name: "Red" },
          { color: "#FBBC04", name: "Orange" },
          { color: "#FFF475", name: "Yellow" }
        ],

        [
          { color: "#CCFF90", name: "Green" },
          { color: "#A7FFEB", name: "Teal" },
          { color: "#CBF0F8", name: "Blue" },
          { color: "#AECBFA", name: "Darkblue" }
        ],

        [
          { color: "#D7AEFB", name: "Purple" },
          { color: "#FDCFE8", name: "Pink" },
          { color: "#E6C9A8", name: "Brown" },
          { color: "#E8EAED", name: "Gray" }
        ]
      ],

      image: String,
      reminderNext: false,
      form: {
        addLabel: null
      },
      Labels: [],
      array: [],

      // takeNote: true,

      date: now,
      string: format(now, dateFormat),
      number: Number(now),
      dynamicByModel: now,

      mdTypeValue: "date",
      dynamicByMdType: now
    };
  },
  computed: {
    firstDayOfAWeek: {
      get() {
        return this.$material.locale.firstDayOfAWeek;
      },
      set(val) {
        this.$material.locale.firstDayOfAWeek = val;
      }
    },
    type() {
      if (
        typeof this.dynamicByModel === "object" &&
        this.dynamicByModel instanceof Date &&
        isValid(this.dynamicByModel)
      ) {
        return "date";
      } else if (typeof this.dynamicByModel === "string") {
        return "string";
      } else if (
        Number.isInteger(this.dynamicByModel) &&
        this.dynamicByModel >= 0
      ) {
        return "number";
      } else if (this.model === null || this.model === undefined) {
        return "null";
      } else {
        throw new Error("Type error");
      }
    },
    dateFormat() {
      return this.$material.locale.dateFormat || "yyyy-MM-dd";
    },
    mdType() {
      switch (this.mdTypeValue) {
        case "date":
          return Date;
        case "string":
          return String;
        case "number":
          return Number;
      }
    }
  },
  mounted() {
    this.getLabelsOfCards();
  },
  methods: {
    reminderNextPage() {
      console.log("IN REMINDER NEXT PAGE");

      this.reminderNext = !this.reminderNext;
    },

    toDate() {
      switch (this.type) {
        case "null":
          this.dynamicByModel = null;
          break;

        case "string":
          this.dynamicByModel = parse(
            this.dynamicByModel,
            this.dateFormat,
            new Date()
          );
          break;

        case "number":
          this.dynamicByModel = new Date(this.dynamicByModel);
          break;
      }
    },

    toString() {
      this.toDate();
      this.dynamicByModel =
        this.dynamicByModel && format(this.dynamicByModel, this.dateFormat);
    },
    toNumber() {
      this.toDate();
      this.dynamicByModel = this.dynamicByModel && Number(this.dynamicByModel);
    },

    /****************************************************************************************
     *
     *
     * EDIT COLOR
     *
     *
     */
    colorsEdit(color, card) {
      console.log("IN ICONLIST.JS COLORS EDIT");

      console.log("editcolor", color);
      console.log("card Details", card);
      if (card == undefined) {
        this.$emit("cardcolor", color);
      } else {
        card.color = color;
        this.updateColor(color, card);
      }
    },

    updateColor(color, card) {
      console.log("card......", card);
      console.log("color", color);
      var data = {
        color: color,
        noteID: card._id
      };
      console.log("edit color(data)", data);
      console.log("dfassssssssssssssssssssssss");

      noteService
        .updateColor(data)
        .then(res => {
          console.log(res);
          console.log("edited Color", res.data);
        })
        .catch(error => {
          console.log(error);
          console.log("error while editng color of card", error);
        });
    },
    /****************************************************************************************************** */

    /********************************************************************
     *
     *
     * ARCHIVE
     *
     *
     */

    archiveNote(card) {
      console.log("IN ARCHIVE");

      var archive = true;
      // var cardId = [notecard._id];

      console.log("aaaaaaaaaaaaaa", archive);
      // console.log("bbbbbbbbbbbbbb", cardId);

      var archiveData = {
        archive: archive,
        noteID: [card._id]
      };
      console.log("archiveData", archiveData);
      noteService
        .archiveNote(archiveData)
        .then(res => {
          console.log("archived data @ iconlist", res);
          this.cardArchive(card);
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    cardArchive(card) {
      card.archive = true;
      this.$emit("card", card);
    },

    /****************************************************************************************************** */

    /********************************************************************
     *
     *
     * UNARCHIVE
     *
     *
     */

    unArchiveNote(card) {
      console.log("IN UN-ARCHIVE");

      var unarchive = false;
      // var cardId = [notecard._id];

      var unArchiveData = {
        archive: unarchive,
        noteID: [card._id]
      };
      console.log("unarchive data", unArchiveData);

      noteService
        .archiveNote(unArchiveData)
        .then(res => {
          console.log("unarchived data @ iconlist", res);
          this.cardUnArchive(card);
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    cardUnArchive(card) {
      card.archive = false;
      this.$emit("unarchivecard", card);
    },

    /****************************************************************************************************** */

    /****************************************************************************************
     *
     *
     * PROCESS FILE
     *
     *
     */

    processFile(e) {
      console.log(e);
      console.log(e.target.files[0].name);
      this.image = e.target.files[0].name;
      // this.$emit("image",this.image)
    },

    /****************************************************************************************************** */

    /****************************************************************************************
     *
     *
     * DELETE CARD
     *
     *
     */

    deleteNoteTemp(array) {
      console.log("IN NOTE DISPLAY(deleteTemp)");

      var deleteCard = {
        delete: true,
        noteID: array._id
      };
      console.log("deleteTemp card details", deleteCard);

      noteService
        .deleteNoteTemp(deleteCard)
        .then(res => {
          console.log("response @ noteDisplayList", res);
          // let index = this.card.indexOf(array);
          // this.card.splice(index, 1);
          this.deleteeCard(deleteCard);
        })
        .catch(error => {
          console.log("error while getting response of trashed notes", error);
        });
    },

    deleteeCard(card) {
      card.trash = true;
      this.$emit("deleteNote", card);
    },

    /****************************************************************************************************** */

    /****************************************************************************************************** */

    /****************************************************************************************
     *
     *
     * CREATE LABEL
     *
     *
     */

    createLabel() {
      console.log("in iconList Create Label");

      var userId = localStorage.getItem("userId");
      console.log("user Id from local stroage in iconList ", userId);

      var createLabelData = {
        userId: userId,
        label: this.form.addLabel
      };

      console.log(
        "before sending data to service in iconlist",
        createLabelData
      );

      noteService
        .createLabel(createLabelData)
        .then(res => {
          console.log("response of created label", res);
        })
        .catch(err => {
          console.log("error while creating label", err);
        });
    },

    /****************************************************************************************
     *
     *
     * ADD LABEL TO NOTE
     *
     *
     */

    addLabel(cardDetails, labelDetails) {
      console.log(
        "[CARD DETAILS] Details when clicke on checkbox",
        cardDetails
      );

      console.log(
        "[LABEL DETAILS]in iconlist when clicked on checkbox",
        labelDetails
      );

      console.log("label", labelDetails);
      console.log("label id", labelDetails._id);

      var addLabeltoCard = {
        noteID: cardDetails._id,
        label: labelDetails.label,
        labelID: labelDetails._id
      };

      console.log(
        "adding label to note(before sending to noteservice)",
        addLabeltoCard
      );

      noteService
        .addLabel(addLabeltoCard)
        .then(res => {
          console.log("response of added label", res);
        })
        .catch(err => {
          console.log("error while adding label", err);
        });
    },

    /****************************************************************************************************** */

    /****************************************************************************************
     *
     *
     * GET ALL LABLES
     *
     *
     */

    getLabelsOfCards() {
      // console.log("in here at click");
      noteService
        .getLabel()
        .then(res => {
          // console.log("getting all the labels created", res.data);
          this.Labels = res.data;
          this.Labels = this.Labels.reverse().slice(); //reverses the order of the labels in an array
        })
        .catch(err => {
          console.log("error while getting labels", err);
        });
    },

    /****************************************************************************************************** */

    makeCopy() {},
    showTickBoxes() {}
  }
};
